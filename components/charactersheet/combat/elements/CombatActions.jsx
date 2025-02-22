import React, { useState } from "react";
import Popup from "@/components/popup/Popup";
import { actionsInCombat } from "@/mockdata/characterSheetMockData";
import { getModifier } from "@/utils/CharacterSheetUtils";

function CombatActions({ characterSheet }) {
  const [selectedActionInCombat, setSelectedActionInCombat] = useState(null);

  const actionInCombatPopup = (
    <Popup onDismiss={(e) => setSelectedActionInCombat(null)}>
      <div className="bg-red-950 border-2 border-red-600 p-2 rounded-lg min-w-[85vw] flex flex-col items-center">
        <h2 className="text-2xl">{selectedActionInCombat?.name}</h2>
        <p>{selectedActionInCombat?.description}</p>
      </div>
    </Popup>
  );

  const weaponActionsSection = (
    <>
      <h3 className="text-center">Weapon Attacks</h3>
      {characterSheet.inventory.personal
        .filter((item) => item.category === "weapon" && item.equipped)
        .map((weapon, index) => (
          <div
            key={index}
            className="px-2 py-1 border rounded-lg bg-red-950 border-red-600"
          >
            <h3 className="">{weapon.item.name}</h3>
            <div className="text-xs flex justify-between">
              <div className="flex gap-2">
                <div className="opacity-70">Hit/DC:</div>
                <div>{getModifier(weapon.item.hitBonus)}</div>
              </div>
              <div className="flex gap-2">
                <div className="opacity-70">Range:</div>
                <div>{weapon.item.range}</div>
              </div>
            </div>
            <div className="text-xs flex justify-between">
              <div className="flex gap-2">
                <div className="opacity-70">Damage:</div>
                <div>
                  {weapon.item.damage.map(
                    (damage) =>
                      `${damage.dice}${
                        damage.bonus > 0 ? getModifier(damage.bonus) : ""
                      } ${damage.type}`
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );

  const actionsInCombatSection = (
    <>
      <h3 className="text-center">Actions in Combat</h3>
      <div className="flex justify-center flex-wrap gap-[6px]">
        {actionsInCombat.map((action) => (
          <div
            key={action.name}
            className="bg-red-950 px-1 py-[2px] rounded-lg border border-red-600 text-xs"
            onClick={(e) => setSelectedActionInCombat(action)}
          >
            {action.name}
          </div>
        ))}
      </div>
      {selectedActionInCombat?.name && actionInCombatPopup}
    </>
  );

  return (
    <>
      <h3 className="text-center text-xl">Actions</h3>
      {weaponActionsSection}
      {actionsInCombatSection}
    </>
  );
}

export default CombatActions;
