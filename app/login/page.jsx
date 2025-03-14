"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function LoginPage() {
  const { data, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (status !== "unauthenticated") {
    return <p className="p-4 text-center">Loading...</p>;
  }

  const signInWithGoogle = async () => {
    signIn("google", { redirectTo: "/" });
  };

  return (
    <div className="flex flex-col h-[50%] md:h-auto p-4 items-center justify-center md:justify-start">
      <div
        className="p-2 rounded-lg bg-red-700 border-red-500 shadow-md shadow-black cursor-pointer"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </div>
    </div>
  );
}

export default LoginPage;
