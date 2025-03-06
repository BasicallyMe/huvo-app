import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import Button from "../components/button";
import { redirect } from "react-router";

export default function SignupPage() {
  function signUpUsers() {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      if (user) {
        return redirect("/app");
      }
    }).catch((error) => {
      console.log(error.code, error.message);
    })
  }

  return (
    <div className="flex min-h-dvh h-dvh max-h-dvh flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="max-w-sm">
        <h2 className="mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an account with us
        </h2>
        <Button onClick={signUpUsers}>Sign up with Google</Button>
      </div>
    </div>
  );
}
