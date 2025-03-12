import { useState, useEffect, useRef } from "react";
import { Copy } from "lucide-react";
import Button from "../components/button";
import { useParams } from "react-router";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Channel() {
  const { channel } = useParams();
  const channelID = channel.replace(/-/g, "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const messageQueueRef = useRef([]);
  const user = auth.currentUser;

  async function verifyChannel() {
    try {
      const docRef = doc(db, "channels", channelID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        createMediaStream();
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err.code, err.message);
    } finally {
      setLoading(false);
    }
  }

  function sendMessage(payload) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(payload);
    } else {
      console.warn("Socket not ready. Queuing Message...");
      messageQueueRef.current.push(payload);
    }
  }

  function createSocketConnection() {
    try {
      const ws = new WebSocket(`wss://huvo-app-server.onrender.com?channelid=${channelID}`);
      ws.onopen = () => {
        console.log("Socket connection established");
        socketRef.current = ws;
        while (messageQueueRef.current.length > 0) {
          socketRef.current.send(messageQueueRef.current.shift());
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("received message", data);
        if (data.type === "create-offer") {
          createRTCOffer();
        } else if (data.type === "offer") {
          answerRTCOffer(data);
        } else if (data.type === "answer") {
          completeRTCConnection(data);
        } else if (data.type === 'ice-candidate') {
          console.log('received ice candidate')
          peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate))
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocker error", error);
      };
      ws.onclose = () => {
        console.log("Web socket cleanup");
      };
    } catch (err) {
      console.log(err);
    }
  }

  async function createRTCOffer() {
    console.log("creating offer");
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection();
    }
    const peerConnection = peerConnectionRef.current;
    mediaStreamRef.current
      .getTracks()
      .forEach((track) =>
        peerConnection.addTrack(track, mediaStreamRef.current)
      );

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('sending ICE candidate')
        socketRef.current.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
          })
        );
      }
    };
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const payload = {
      type: "offer",
      sdp: offer.sdp,
      channelID: channel,
    };

    sendMessage(JSON.stringify(payload));
    console.log("Sending offer", offer);
  }

  async function answerRTCOffer(data) {
    console.log("received offer", data);
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection();
    }

    const peerConnection = peerConnectionRef.current;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
    mediaStreamRef.current
      .getTracks()
      .forEach((track) =>
        peerConnection.addTrack(track, mediaStreamRef.current)
      );
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('sending ICE Candidate')
        socketRef.current.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
          })
        );
      }
    };
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    const payload = {
      type: "answer",
      sdp: answer.sdp,
      channelID,
    };
    sendMessage(JSON.stringify(payload));
    console.log("Sending answer");
  }

  async function completeRTCConnection(data) {
    console.log("receiving answer", data);
    await peerConnectionRef.current.setRemoteDescription(
      new RTCSessionDescription(data)
    );
    console.log("RTC Connection established");
  }

  function createMediaStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          createSocketConnection();
        })
        .catch((error) => {
          console.log("microphone access error", error);
        });
    } else {
      alert("Media not supported on your browser");
    }
  }

  useEffect(
    function initializeChannel() {
      verifyChannel();
    },
    [channel]
  );

  return (
    <div className="w-full h-dvh max-h-dvh flex flex-col items-center relative">
      {loading && <Loading />}
      {error ? (
        <Error />
      ) : (
        <div className="w-sm max-w-sm h-full py-5 flex flex-col items-center justify-between">
          <div>
            <h2 className="text-center text-xs text-gray-500">Channel ID</h2>
            <div className="text-center font-semibold text-sm flex items-center gap-2">
              <span>{channel}</span>
              <button className="cursor-pointer">
                <Copy size={15} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-12 h-12 overflow-hidden rounded-full justify-self-start self-end">
              <img src="/avatar.png" alt="Avatar" className="object-cover" />
            </div>
            <div className="w-48 h-48 rounded-full bg-gray-950" />
          </div>
          <div className="w-full max-w-xs">
            <p className="text-center text-gray-400 text-xs mb-2">
              Tip: Hold the spacebar for push to talk
            </p>
            <div className="flex items-center gap-3">
              <Button className="pointer-cursor">Push to talk</Button>
              <Button className="bg-red-500">Leave channel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="w-full h-full bg-white/30 backdrop-blur-xs absolute top-0 left-0 flex items-center justify-center text-white">
      <h2 className="text-sm font-semibold">Joining channel...</h2>
    </div>
  );
}

function Error() {
  return (
    <div className="w-sm max-w-sm h-full py-5 flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold text-center">{`The channel doesn't exist`}</h2>
      <p className="text-center text-sm text-gray-500">{`Looks like the channel doesn't exists. Try joining a different one`}</p>
    </div>
  );
}
