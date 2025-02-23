"use client";
import React from "react";
import characterSheet from "@/mockdata/characters/FlickMcPlumbs";
import CharacterSheet from "@/components/charactersheet/CharacterSheet";

function FlickMcPlumbsCharacterSheet() {
  return <CharacterSheet characterSheet={characterSheet} initTheme={"red"} />;
}

export default FlickMcPlumbsCharacterSheet;
