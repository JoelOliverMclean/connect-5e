import Image from "next/image";
import React from "react";
import { getModifier, getModifierFromStat } from "@/utils/CharacterSheetUtils";
import CombatAbilities from "./elements/CombatAbilities";
import CombatActions from "./elements/CombatActions";
import CombatBonusActions from "./elements/CombatBonusActions";
import CombatReactions from "./elements/CombatReactions";
import CombatWeapons from "./elements/CombatWeapons";

function CharacterSheetCombat({ characterSheet, theme }) {
  const showACHelp = () => {};

  const topSection = (
    <div className="">
      <div className="grid grid-cols-3 justify-evenly gap-2">
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} flex flex-col shadow-md ${theme.shadow}`}
        >
          <div className="relative flex-1 flex items-center justify-center">
            <div className="text-center text-3xl pt-1">
              {characterSheet.armorClass.total()}
            </div>
            <Image
              className="absolute top-0 right-0"
              src={"/icons/help_icon_48.png"}
              width={16}
              height={16}
              alt="armor class help"
            />
          </div>
          <h3 className="text-center text-xs px-1">Armor Class</h3>
        </div>
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} shadow-md ${theme.shadow}`}
        >
          <div className="relative">
            <p className="text-center text-3xl pt-1">
              {characterSheet.attacksPerAction}
            </p>
          </div>
          <h3 className="text-center text-xs px-1">Attacks</h3>
          <h3 className="text-center text-xs px-1">per Action</h3>
        </div>
        <div
          className={`p-1 border rounded-lg ${theme.border} ${theme.bg} flex flex-col shadow-md ${theme.shadow}`}
        >
          <div className="flex-1 flex justify-center items-center text-center text-3xl">
            {getModifierFromStat(characterSheet.abilityScores.dexterity)}
          </div>
          <h3 className="text-center text-xs px-1">Initiative</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-2 gap-3">
      {topSection}
      <div className="flex flex-col gap-2">
        <CombatWeapons characterSheet={characterSheet} theme={theme} />
      </div>
      <div className="flex flex-col gap-2">
        <CombatAbilities characterSheet={characterSheet} theme={theme} />
      </div>
      <div className="flex flex-col gap-2">
        <CombatBonusActions characterSheet={characterSheet} theme={theme} />
      </div>
      <div className="flex flex-col gap-2">
        <CombatReactions characterSheet={characterSheet} theme={theme} />
      </div>
      <div className="flex flex-col gap-2 pb-2">
        <CombatActions theme={theme} />
      </div>
    </div>
  );
}

export default CharacterSheetCombat;
