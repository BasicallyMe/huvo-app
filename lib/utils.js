import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateChannelID() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
  return nanoid();
}

export function formatChannelID(id) {
  const cleanID = id.replace(/-/g, "");
  return `${cleanID.slice(0, 4)}-${cleanID.slice(4, 7)}-${cleanID.slice(7, 9)}`;
};
