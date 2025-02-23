"use client";
import React from "react";
import characterSheet from "@/mockdata/characters/LordMajiCock";
import CharacterSheet from "@/components/charactersheet/CharacterSheet";

function LordMajiCockCharacterSheet() {
  return <CharacterSheet characterSheet={characterSheet} initTheme={"blue"} />;
}

export default LordMajiCockCharacterSheet;
