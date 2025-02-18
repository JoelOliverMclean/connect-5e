import { auth } from "@/auth";
import UserAvatar from "@/components/userAvatar/UserAvatar";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-[100%] overflow-auto">
      {/* {session?.user ? (
        <div>Logged in as {session.user.name}</div>
      ) : (
        <div>Not logged in</div>
      )} */}
      <div className="p-3">
        <Link
          className="px-3 py-1 bg-red-800 hover:bg-red-600 rounded-md"
          href="/charactersheet"
        >
          Character Sheet
        </Link>
      </div>
    </div>
  );
}
