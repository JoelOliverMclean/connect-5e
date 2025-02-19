import Popup from "@/components/popup/Popup";
import Image from "next/image";
import React, { useState } from "react";
import { weapons } from "@/mockdata/characterSheetMockData";

const styles = {
  weaponBox:
    "bg-red-950 rounded-lg p-2 border-yellow-500 border flex flex-col gap-1 shadow-md shadow-black",
};

function CombatWeapons() {
  const [selectedWeapon, setSelectedWeapon] = useState({});
  const [weaponsOpen, setWeaponsOpen] = useState(true);

  const closeWeaponPopup = () => {
    setSelectedWeapon({});
  };

  const weaponPopup = (
    <Popup onDismiss={(e) => setSelectedWeapon({})}>
      <div
        key={selectedWeapon?.name}
        className={styles.weaponBox + " col-span-2 border-2 min-w-[85vw]"}
      >
        <div
          className={"font-bold text-lg justify-between items-start relative"}
        >
          <h4 className={"text-center text-2xl"}>{selectedWeapon?.name}</h4>
          <Image
            onClick={(e) => {
              e.stopPropagation();
              closeWeaponPopup();
            }}
            className="p-1 top-0 right-0 absolute"
            src="/icons/close_round_icon.png"
            width={24}
            height={24}
            alt="close weapon popup"
          />
        </div>
        <div>
          <span className="font-bold text-gray-300 text-xs">Hit/DC:</span>{" "}
          <span className="">{selectedWeapon?.hitBonusOrDC}</span>
        </div>
        <div className="text-sm">
          <div className="font-bold text-gray-300 text-xs">Damage: </div>
          <div className="">{selectedWeapon?.damage}</div>
        </div>
        <div className="text-sm">
          <div className="font-bold text-gray-300 text-xs">Range: </div>
          <div className="">{selectedWeapon?.range}</div>
        </div>
        <div className="text-sm">
          <div className="font-bold text-gray-300 text-xs">Notes: </div>
          <div className="">
            Extra info about the weapon that the player might need to know
          </div>
        </div>
      </div>
    </Popup>
  );

  return (
    <>
      <h3 className="text-center text-xl">Weapons</h3>
      <div>
        <div className="grid grid-cols-2 gap-2 pb-3">
          {weapons
            .toSorted((a, b) => (b === selectedWeapon) - (a === selectedWeapon))
            .map((weapon) => (
              <div
                key={weapon.name}
                className="text-center bg-red-950 p-2 border-yellow-500 border rounded-lg shadow-md shadow-yellow-950 font-bold flex justify-center items-center"
                onClick={() => setSelectedWeapon(weapon)}
              >
                {weapon.name}
              </div>
            ))}
        </div>
      </div>
      {Object.keys(selectedWeapon).length !== 0 && weaponPopup}
    </>
  );
}

export default CombatWeapons;
