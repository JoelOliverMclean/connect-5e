import { getModifier, getModifierFromStat } from "@/utils/CharacterSheetUtils";
import Image from "next/image";
import React from "react";
import CharacterSheetSpells from "./spells/CharacterSheetSpells";

function CharacterSheetMagic({ characterSheet, theme }) {
  const topSection = (
    <div className="">
      <div className="grid grid-cols-3 justify-evenly gap-2">
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} flex flex-col shadow-md ${theme.shadow}`}
        >
          <div className="relative flex-1 flex items-center justify-center">
            <div className="text-center text-3xl pt-1">
              {getModifierFromStat(
                characterSheet.abilityScores[
                  characterSheet.spellcasting?.ability
                ]
              )}
            </div>
            <Image
              className="absolute top-0 right-0"
              src={"/icons/help_icon_48.png"}
              width={16}
              height={16}
              alt="spellcasting modifier help"
            />
          </div>
          <h3 className="text-center text-xs px-1">Spellcasting Modifier</h3>
        </div>
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} flex flex-col shadow-md ${theme.shadow}`}
        >
          <div className="flex-1 flex justify-center items-center text-center text-3xl">
            {characterSheet.getSpellSaveDC()}
          </div>
          <h3 className="text-center text-xs px-1">
            Spell Save
            <br />
            DC
          </h3>
        </div>
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} flex flex-col shadow-md ${theme.shadow}`}
        >
          <div className="flex-1 flex justify-center items-center text-center text-3xl">
            {getModifier(characterSheet.getSpellAttackBonus())}
          </div>
          <h3 className="text-center text-xs px-1">Spell Attack Bonus</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-2 gap-4">
      {topSection}
      <CharacterSheetSpells
        spells={characterSheet.spellcasting.spells}
        spellSlots={characterSheet.spellcasting.spellSlots}
        theme={theme}
      />
    </div>
  );
}

export default CharacterSheetMagic;
