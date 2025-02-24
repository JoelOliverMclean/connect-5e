import Image from "next/image";
import React from "react";
import { getModifierFromStat } from "@/utils/CharacterSheetUtils";
import CombatActions from "./elements/CombatActions";
import CombatWeapons from "./elements/CombatWeapons";
import CombatFeatures from "./elements/CombatFeatures";

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

  const actions = characterSheet.features().filter((p) => p.type === "action");

  const bonusActions = characterSheet
    .features()
    .filter((p) => p.type === "bonus action");

  const reactions = characterSheet
    .features()
    .filter((p) => p.type === "reaction");

  const weapons = characterSheet.inventory.backpack.filter(
    (item) => item.category === "weapon" && item.equipped
  );

  return (
    <div className="flex flex-col p-2 gap-4">
      {topSection}
      {weapons.length > 0 && (
        <div className="flex flex-col gap-2">
          <CombatWeapons weapons={weapons} theme={theme} />
        </div>
      )}
      {actions.length > 0 && (
        <div className="flex flex-col gap-2">
          <CombatFeatures features={actions} theme={theme} type="Abilities" />
        </div>
      )}
      {bonusActions.length > 0 && (
        <div className="flex flex-col gap-2">
          <CombatFeatures
            features={bonusActions}
            theme={theme}
            type="Bonus Actions"
          />
        </div>
      )}
      {reactions.length > 0 && (
        <div className="flex flex-col gap-2">
          <CombatFeatures features={reactions} theme={theme} type="Reactions" />
        </div>
      )}
      <div className="flex flex-col gap-2 pb-2">
        <CombatActions theme={theme} />
      </div>
    </div>
  );
}

export default CharacterSheetCombat;
