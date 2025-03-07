import Button from "../components/button";
import Input from "../components/input";
import { useState } from "react";
import { formatChannelID, generateChannelID } from "../../lib/utils";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function createChannel() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("user-not-authenticated");

      const channelID = generateChannelID();
      const docRef = doc(db, "channels", channelID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return createChannel();
      }
      setDoc(docRef, {
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        users: [user.uid],
      })
        .then(() => {
          joinChannel(channelID);
        })
        .catch((err) => {
          console.log(err.code, err.message);
        });
    } catch (err) {
      console.log(err.code, err.message);
    }
  }

  function joinChannel(channelID) {
    const formattedID = formatChannelID(channelID);
    navigate(`/app/${formattedID}`)
  }

  async function handleFormSubmit(form) {
    const formData = Object.fromEntries(form);
    const channelID = formData.channel_id.replace(/-/g, "");
    try {
      const docRef = doc(db, 'channels', channelID)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        joinChannel(channelID)
      } else {
        setError("This channel doesn't exits. Please try again")
      }
    } catch(err) {
      console.log(err.code, err.message)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      <ChannelJoining
        submitHandler={handleFormSubmit}
        handleCreateChannel={createChannel}
      />
    </div>
  );
}

function ChannelJoining({ submitHandler, handleCreateChannel }) {
  return (
    <div className="max-w-sm w-sm">
      <Button className="mb-3" onClick={handleCreateChannel}>
        Create a channel
      </Button>
      <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
        <div className="bg-gray-300 h-px flex-1" />
        <span>or</span>
        <div className="bg-gray-300 h-px flex-1" />
      </div>
      <form action={submitHandler}>
        <label htmlFor="room_id" className="text-sm font-medium">
          Type a Channel ID to join
        </label>
        <Input type="text" name="channel_id" placeholder="abcd-qrs-mno" />
        <Button type="submit">Join channel</Button>
      </form>
    </div>
  );
}
