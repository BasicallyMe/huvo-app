import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import Button from "../components/button";
import { redirect } from "react-router";

export default function SignupPage() {
  function signUpUsers() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          return redirect("/app");
        }
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  return (
    <div className="flex min-h-dvh h-dvh max-h-dvh flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="max-w-[600px] flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl xl:text-6xl/none">
          Sign up to use <span className="text-primary">Huvo</span>
        </h1>
        <p className="text-muted-foreground md:text-md text-center">
          Connect with friends, family, or teammates with the push of a button.
          No phone numbers, no complicated setup - just instant voice
          communication.
        </p>
        <Button onClick={signUpUsers} className="max-w-[200px]">Sign up with Google</Button>
      </div>
    </div>
  );
}
