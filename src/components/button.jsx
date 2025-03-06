import { cn } from "../../lib/utils";

export default function Button({ onClick, className, children, ...props}) {
  return (
    <button
      className={cn("flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", className)}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
