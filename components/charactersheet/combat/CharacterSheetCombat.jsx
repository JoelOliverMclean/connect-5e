import Image from "next/image";
import React from "react";
import CombatWeapons from "./elements/CombatWeapons";
import { AC, attacksPerAction, stats } from "@/mockdata/characterSheetMockData";
import { getModifier } from "@/utils/CharacterSheetUtils";
import CombatAbilities from "./elements/CombatAbilities";
import CombatActions from "./elements/CombatActions";
import CombatBonusActions from "./elements/CombatBonusActions";
import CombatReactions from "./elements/CombatReactions";

function CharacterSheetCombat() {
  const showACHelp = () => {};

  const topSection = (
    <div className="">
      <div className="grid grid-cols-3 justify-evenly gap-2">
        <div className="p-1 border rounded-lg border-red-600 bg-red-950 flex flex-col shadow-md shadow-red-950">
          <div className="relative flex-1 flex items-center justify-center">
            <div className="text-center text-3xl pt-1">{AC}</div>
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
        <div className="p-1 border rounded-lg border-red-600 bg-red-950 shadow-md shadow-red-950">
          <div className="relative">
            <p className="text-center text-3xl pt-1">{attacksPerAction}</p>
          </div>
          <h3 className="text-center text-xs px-1">Attacks</h3>
          <h3 className="text-center text-xs px-1">per Action</h3>
        </div>
        <div className="p-1 border rounded-lg border-red-600 bg-red-950 flex flex-col shadow-md shadow-red-950">
          <div className="flex-1 flex justify-center items-center text-center text-3xl">
            {getModifier(stats.dexterity.value)}
          </div>
          <h3 className="text-center text-xs px-1">Initiative</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-2 gap-2">
      {topSection}
      {<CombatActions />}
      {<CombatWeapons />}
      {<CombatAbilities />}
      {<CombatBonusActions />}
      {<CombatReactions />}
    </div>
  );
}

export default CharacterSheetCombat;
