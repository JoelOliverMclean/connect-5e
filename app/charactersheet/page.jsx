"use client";
import CharacterSheet from "@/components/charactersheet/CharacterSheet";
import Image from "next/image";
import React, { useState } from "react";
import characterSheet from "@/mockdata/characters/LordMajiCock";

function CharacterSheetPage() {
  return <CharacterSheet characterSheet={characterSheet}></CharacterSheet>;
}

export default CharacterSheetPage;
