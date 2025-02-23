"use client";
import React, { useState } from "react";
import ToolbarMenu from "../toolbarMenu/ToolbarMenu";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className="bg-red-900 sticky top-0">
      <div className="container px-3 mx-auto h-[40px] flex items-center">
        <Link className="flex-1 text-2xl font-bold" href={"/"}>
          Connect5e
        </Link>
        <div className="flex-1 flex justify-end">{/* <ToolbarMenu /> */}</div>
      </div>
    </div>
  );
}
