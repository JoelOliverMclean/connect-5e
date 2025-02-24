"use client";
import CharacterSheet from "@/components/charactersheet/CharacterSheet";
import Image from "next/image";
import React, { useState } from "react";
import lordMagiCock from "@/mockdata/characters/LordMajiCock";
import flickMcPlumbs from "@/mockdata/characters/FlickMcPlumbs";

function DMScreen() {
  return (
    <div className="flex h-full">
      <CharacterSheet characterSheet={flickMcPlumbs} dm={true} />
      <CharacterSheet characterSheet={lordMagiCock} dm={true} />
      <CharacterSheet characterSheet={flickMcPlumbs} dm={true} />
      <CharacterSheet characterSheet={lordMagiCock} dm={true} />
    </div>
  );
}

export default DMScreen;
