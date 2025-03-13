import { Wifi, Clock, Users, Shield, Zap, Globe } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything You Need for Instant Communication
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Huvo provides seamless voice communication with powerful features
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Wifi className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Peer-to-Peer Connection</h3>
            <p className="text-center text-muted-foreground">
              Direct connection between devices for faster communication with
              lower latency
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Clock className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Instant Transmission</h3>
            <p className="text-center text-muted-foreground">
              Press and talk with zero delay - just like a real walkie talkie
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Users className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Group Channels</h3>
            <p className="text-center text-muted-foreground">
              Create channels for teams, friends, or family to communicate
              together
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">End-to-End Encryption</h3>
            <p className="text-center text-muted-foreground">
              Your conversations are secure and private with advanced encryption
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Zap className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Low Battery Usage</h3>
            <p className="text-center text-muted-foreground">
              Optimized to use minimal battery power even during extended
              sessions
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <Globe className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Works Everywhere</h3>
            <p className="text-center text-muted-foreground">
              Connect from anywhere in the world with an internet connection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
