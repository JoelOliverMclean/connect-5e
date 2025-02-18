"use client";
import React, { useState } from "react";
import ToolbarMenu from "../toolbarMenu/ToolbarMenu";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className="bg-red-900 p-3 flex flex-grow-0 flex-shrink-0 items-center h-[40px] sticky top-0">
      <div className="flex-1 text-2xl font-bold">
        <Link href={"/"}>Connect5e</Link>
      </div>
      <div className="flex-1 flex justify-end">{/* <ToolbarMenu /> */}</div>
    </div>
  );
}
