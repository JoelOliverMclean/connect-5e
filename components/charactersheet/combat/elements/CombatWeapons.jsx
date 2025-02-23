import React, { useState } from "react";
import Popup from "@/components/popup/Popup";
import { getModifier } from "@/utils/CharacterSheetUtils";

function CombatWeapons({ weapons, theme }) {
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const weaponPopup = (
    <Popup onDismiss={(e) => setSelectedWeapon(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] flex flex-col`}
      >
        <h2 className="text-xl font-bold">{selectedWeapon?.name}</h2>
        <p className="text-sm">{selectedWeapon?.description}</p>
        {selectedWeapon?.properties?.length > 0 && (
          <>
            <h4 className="font-bold">Properties:</h4>
            <p className="text-sm">{selectedWeapon.properties.join(", ")}</p>
          </>
        )}
      </div>
    </Popup>
  );

  const weaponActionsSection = (
    <>
      <h3 className="text-center text-xl">Weapon Attacks</h3>
      <div className="flex flex-col gap-2">
        {weapons.map((weapon, index) => (
          <div
            key={index}
            className={`px-2 py-1 border rounded-lg ${theme.bg} ${theme.border} ${theme.shadow} shadow-md`}
            onClick={(e) => setSelectedWeapon(weapon.item)}
          >
            <h3 className="font-bold">{weapon.item.name}</h3>
            <div className="text-xs flex justify-between">
              <div className="flex gap-2">
                <div className="opacity-70">Hit Bonus:</div>
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
                  {weapon.item.damage
                    .map(
                      (damage) =>
                        `${damage.dice}${
                          damage.bonus > 0 ? getModifier(damage.bonus) : ""
                        } ${damage.type}`
                    )
                    .join(", ")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedWeapon?.name && weaponPopup}
    </>
  );
  return weaponActionsSection;
}

export default CombatWeapons;
