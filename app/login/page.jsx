"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function LoginPage() {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <p className="p-4 text-center">Loading...</p>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  const signInWithGoogle = async () => {
    signIn("google");
  };

  return (
    <div className="flex h-[50%] md:h-auto p-4 justify-center md:justify-start">
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
