"use client";
import Image from "next/image";
import React, { useState } from "react";
import CharacterSheetStats from "../stats/CharacterSheetStats";
import CharacterSheetCombat from "../combat/CharacterSheetCombat";
import CharacterSheetMagic from "../magic/CharacterSheetMagic";
import CharacterSheetInventory from "../inventory/CharacterSheetInventory";
import CharacterSheetProfile from "../profile/CharacterSheetProfile";

const styles = {
  bottomBarButton:
    "w-[48px] flex justify-center items-center rounded-full duration-300",
};

function CharacterSheetNav({ children }) {
  const statsPage = <CharacterSheetStats />;
  const combatPage = <CharacterSheetCombat />;
  const magicPage = <CharacterSheetMagic />;
  const inventoryPage = <CharacterSheetInventory />;
  const profilePage = <CharacterSheetProfile />;

  const [selected, setSelected] = useState("stats");
  const [page, setPage] = useState(statsPage);

  const changeTab = (name, page) => {
    setSelected(name);
    setPage(page);
  };

  const tab = (icon, name, page) => (
    <div
      className={
        styles.bottomBarButton + (selected === name ? " bg-red-700" : "")
      }
      onClick={() => changeTab(name, page)}
    >
      <Image
        src={"/icons/" + icon + ".png"}
        width={24}
        height={24}
        alt={name}
      />
    </div>
  );

  const openStatsSettings = () => {};

  const hpCell = (
    <div className="text-center flex flex-col pt-2 px-2 pb-1 gap-1 bg-green-800 rounded-lg">
      <p className="text-3xl font-bold">
        <span className="bg-gray-900 rounded-lg px-2 me-1">31</span>
        {"/"}
        <span className="bg-gray-900 rounded-lg px-2 ms-1">31</span>
      </p>
      <p className="text-xs">HP</p>
    </div>
  );

  const header = (
    <div>
      <div className="text-center text-xl font-bold">Flick McPlumbs</div>
      <div className="text-center text-xs">Human | Fighter | Level 3</div>
      <div className="flex p-2 items-center justify-center gap-2">{hpCell}</div>
    </div>
  );

  return (
    <div className="h-[100%] flex flex-col-reverse">
      <div className="h-[48px] flex justify-evenly bg-red-900 py-1 flex-grow-0 flex-shrink-0 flex-auto sticky top-0">
        {tab("stats_chart_sharp_icon_48", "stats", statsPage)}
        {tab("sword_fill_icon_48", "combat", combatPage)}
        {tab("magic_wand_fill_icon_48", "magic", magicPage)}
        {tab("treasure_chest_icon_48", "inventory", inventoryPage)}
        {tab("bust_icon_48", "profile", profilePage)}
      </div>
      <div className="flex-1 overflow-auto">{page}</div>
      <div className="py-1 border-b border-red-900 flex-grow-0 flex-shrink-0 flex-auto">
        {header}
      </div>
    </div>
  );
}

export default CharacterSheetNav;
