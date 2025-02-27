"use client";
import React, { useEffect, useState } from "react";
import ToolbarMenu from "../toolbarMenu/ToolbarMenu";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Popup from "../popup/Popup";

export default function Toolbar() {
  const pathname = usePathname();
  const { data, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuLogout = async () => {
    setMenuOpen(false);
    signOut();
  };

  const menu = (
    <div
      className="absolute top-[40px] right-0 bottom-0 left-0 bg-black bg-opacity-30 flex flex-row-reverse items-start p-2 container"
      onClick={(e) => setMenuOpen(false)}
    >
      <div
        className="bg-red-900 rounded-md flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-2 py-1 cursor-pointer" onClick={menuLogout}>
          Logout
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-red-900 sticky top-0">
        <div className="container px-3 mx-auto h-[40px] flex items-center">
          <Link className="flex-1 text-2xl font-bold" href={"/"}>
            Connect5e
          </Link>
          <div className="flex-1 flex justify-end items-center gap-1">
            {status === "authenticated" ? (
              <>
                <div
                  className="h-[32px] w-[32px] relative cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Image
                    className="rounded-full object-contain"
                    src={data.user?.image}
                    fill
                    alt="logged in user profile image"
                  />
                </div>
              </>
            ) : (
              <>
                {pathname !== "/login" && (
                  <Link className="p-2" href={"/login"}>
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div>{menuOpen && menu}</div>
    </>
  );
}
