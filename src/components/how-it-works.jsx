import { CheckCircle } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Simple, intuitive, and ready to use in seconds
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-none text-primary" />
                <div>
                  <h3 className="font-bold">1. Download Huvo</h3>
                  <p className="text-muted-foreground">
                    Get our app from your device's app store or use the web version
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-none text-primary" />
                <div>
                  <h3 className="font-bold">2. Create an Account</h3>
                  <p className="text-muted-foreground">Sign up with your email or continue as a guest</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-none text-primary" />
                <div>
                  <h3 className="font-bold">3. Create or Join a Channel</h3>
                  <p className="text-muted-foreground">
                    Start your own channel or join existing ones with a simple code
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-none text-primary" />
                <div>
                  <h3 className="font-bold">4. Press and Talk</h3>
                  <p className="text-muted-foreground">Hold the talk button and speak - release when you're done</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-[300px]">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="How to use Huvo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

