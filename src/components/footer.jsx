import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Huvo</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <a href="#" className="text-sm hover:underline underline-offset-4">
            Terms
          </a>
          <a href="#" className="text-sm hover:underline underline-offset-4">
            Privacy
          </a>
          <a href="#" className="text-sm hover:underline underline-offset-4">
            Contact
          </a>
        </nav>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Huvo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
