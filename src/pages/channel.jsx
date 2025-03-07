import { Copy } from "lucide-react";
import Button from "../components/button";
import { useParams } from "react-router";

export default function Channel() {
  const { channel } = useParams();
  return (
    <div className="w-full h-dvh max-h-dvh flex flex-col items-center">
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
    </div>
  );
}
