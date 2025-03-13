import Button from "./button";
import { Radio } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Huvo</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </a>
          <a href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button>
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
