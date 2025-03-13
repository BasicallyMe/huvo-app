import Button from './button';

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to start talking?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join thousands of users already enjoying Huvo's instant voice
              communication
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 bg-primary-foreground text-foreground outline-none"
              />
              <Button type="submit" variant="secondary">
                Get Early Access
              </Button>
            </form>
            <p className="text-xs">
              We'll send you a download link. No spam, we promise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
