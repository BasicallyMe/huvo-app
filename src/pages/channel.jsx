import { useState, useEffect, useRef } from "react";
import { Copy } from "lucide-react";
import Button from "../components/button";
import { useParams } from "react-router";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Channel() {
  const { channel } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const mediaStreamRef = useRef(null);

  async function verifyChannel() {
    const channelID = channel.replace(/-/g, "");
    try {
      const docRef = doc(db, "channels", channelID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        socketRef.current = createSocketConnection(channelID);
        console.log("socket ref state", socketRef.current.readyState);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err.code, err.message);
    } finally {
      setLoading(false);
    }
  }

  function createSocketConnection() {
    try {
      const ws = new WebSocket(`ws://localhost:3000?channelid=${channel}`);
      ws.onopen = () => {
        console.log("connection open");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "create-offer") {
          createRTCOffer();
        } else if (data.type === "offer") {
          answerRTCOffer(data);
        } else if (data.type === "answer") {
          completeRTCConnection(data);
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocker error", error);
      };
      ws.onclose = () => {
        console.log("Web socket cleanup");
      };
      return ws;
    } catch (err) {
      console.log(err);
    }
  }

  async function createRTCOffer() {
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection();
    }
    const peerConnection = peerConnectionRef.current;
    mediaStreamRef.current
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const payload = {
      type: "offer",
      sdp: offer.sdp,
      channelID: channel,
    };

    socketRef.current.send(JSON.stringify(payload));

    console.log("Offer sent", offer);
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
      .forEach((track) => peerConnection.addTrack(track, stream));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socketRef.current.send(
      JSON.stringify({
        type: "answer",
        sdp: answer.sdp,
        channelID,
      })
    );
  }

  async function completeRTCConnection(data) {
    console.log('receiving answer', data);
    await peerConnectionRef.current.setRemoteDescription(
      new RTCSessionDescription(data)
    );
    console.log("RTC Connection established");
  }

  function createMediaStream() {
    console.log("creating media stream");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
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
      createMediaStream();
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
