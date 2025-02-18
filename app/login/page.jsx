import { signIn } from "@/auth";
import React from "react";

const styles = {
  googleButton:
    "p-3 rounded-md bg-red-800 cursor-pointer hover:bg-red-600 duration-300",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center p-3">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button className={styles.googleButton} type="submit">
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
