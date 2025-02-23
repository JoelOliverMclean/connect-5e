"use client";
import UserAvatar from "@/components/userAvatar/UserAvatar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow overflow-y-auto flex flex-col gap-4 h-full p-3">
      {/* {session?.user ? (
        <div>Logged in as {session.user.name}</div>
      ) : (
        <div>Not logged in</div>
      )} */}
      <div className="">
        <Link
          className="px-3 py-1 bg-red-800 hover:bg-red-600 rounded-md"
          href="/charactersheet/lord-maji-cock"
        >
          Lord Maji Cock
        </Link>
      </div>
      <div className="">
        <Link
          className="px-3 py-1 bg-red-800 hover:bg-red-600 rounded-md"
          href="/charactersheet/flick-mcplumbs"
        >
          Flick McPlumbs
        </Link>
      </div>
    </div>
  );
}
