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

  const currentHealth = 20; // Example current health
  const maxHealth = 28; // Example max health
  const healthPercentage = (currentHealth / maxHealth) * 100; // Calculate percentage

  const hpCell = (
    <div className="flex-1 flex flex-col gap-1">
      <div
        className="flex-1 justify-center text-center flex flex-col pt-[2px] gap-1 rounded-lg border border-[var(--foreground)]"
        style={{
          background: `linear-gradient(to right, #166534 ${healthPercentage}%, #991b1b ${healthPercentage}%)`,
        }}
      >
        <p className="text-xl font-bold px-1">
          <span className=" rounded-lg px-1">{currentHealth}</span>
          {"/"}
          <span className=" rounded-lg px-1">{maxHealth}</span>
        </p>
      </div>
      <p className="text-xs text-center">Hit Points</p>
    </div>
  );

  const hitDie = (
    <div className="flex-1 flex flex-col justify-end items-center gap-1">
      <div className="items-end justify-center gap-2 text-center flex p-[6px] border rounded-lg">
        <div className="rounded p-1 border border-white"></div>
        <div className="rounded p-1 border border-white"></div>
        <div className="rounded p-1 border border-white"></div>
      </div>
      <p className="text-xs text-center">
        Hit Die <span className="text-yellow-500">(d12)</span>
      </p>
    </div>
  );

  const deathSaves = (
    <div className="flex-1 flex flex-col gap-1">
      <div className="flex-1 text-center flex gap-2">
        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs">Successes</p>
          <div className="w-[64px] h-[20px] flex justify-evenly items-center rounded-lg border border-[var(--foreground)] bg-green-800">
            <div className="rounded p-1 border border-white"></div>
            <div className="rounded p-1 border border-white"></div>
            <div className="rounded p-1 border border-white"></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs">Failures</p>
          <div className="w-[64px] h-full flex justify-evenly items-center rounded-lg border border-[var(--foreground)] bg-red-800">
            <div className="rounded p-1 border border-white"></div>
            <div className="rounded p-1 border border-white"></div>
            <div className="rounded p-1 border border-white"></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-center">Death Saves</p>
    </div>
  );

  const header = (
    <div className="px-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="text-xl font-bold">Flick McPlumbs</div>
          <div className="text-xs">Male Human | Fighter 3</div>
        </div>
        <div className="flex-col flex gap-1">
          <div className="flex-1 py-1 px-2 mt-1 flex items-center justify-center border border-white rounded-lg bg-slate-800">
            <p className="text-xs">30ft</p>
          </div>
          <p className="text-xs text-center">Speed</p>
        </div>
        <div className="flex-col flex gap-1">
          <div className="flex-1 py-1 px-2 mt-1 flex items-center justify-center border border-white rounded-lg bg-slate-800">
            <p className="text-xs">Invisible</p>
          </div>
          <p className="text-xs text-center">Condition</p>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {hpCell}
        {hitDie}
        {deathSaves}
      </div>
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
