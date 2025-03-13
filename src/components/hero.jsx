import Button from "./button";
import { ArrowRight, Radio } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-8">
        <Radio className="h-8 w-8 text-primary mr-2" />
        <span className="text-3xl font-bold">Huvo</span>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="space-y-2 max-w-[700px]">
          <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl xl:text-6xl/none">
            Talk Instantly with <span className="text-primary">Huvo</span>
          </h1>
          <p className="text-muted-foreground md:text-md text-center">
            Connect with friends, family, or teammates with the push of a
            button. No phone numbers, no complicated setup - just instant voice
            communication.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row w-full">
          <Button size="lg" className="gap-1 flex items-center">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
