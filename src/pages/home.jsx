import Button from "../components/button";
import Input from "../components/input";
import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Copy, PhoneOff } from "lucide-react";

export default function HomePage() {
  const [roomJoined, setRoomJoined] = useState(false);
  function createARoom() {
    console.log("creating a room");
  }

  function joiningARoom() {
    console.log("joining a room");
  }

  function handleFormSubmit(form) {
    const formData = Object.fromEntries(form);
    console.log("Form Data", formData);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      {roomJoined ? (
        <Channel />
      ) : (
        <ChannelJoining submitHandler={handleFormSubmit} />
      )}
    </div>
  );
}

function ChannelJoining({ submitHandler }) {
  return (
    <div className="max-w-sm w-sm">
      <Button className="mb-3">
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
        <Input type="text" name="room_id" placeholder="abcd-qrs-mno" />
        <Button type="submit">Join channel</Button>
      </form>
    </div>
  );
}

function Channel() {
  return (
    <div className="w-sm max-w-sm h-full py-5 flex flex-col items-center justify-between">
      <div>
        <h2 className="text-center text-xs text-gray-500">Channel ID</h2>
        <div className="text-center font-semibold text-sm flex items-center gap-2">
          <span>{"meet-axh-huvo"}</span>
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
          Hold the spacebar for push to talk
        </p>
        <div className="flex items-center gap-3">
          <Button className="pointer-cursor">Push to talk</Button>
          <Button className="bg-red-500">Leave channel</Button>
        </div>
      </div>
    </div>
  );
}
