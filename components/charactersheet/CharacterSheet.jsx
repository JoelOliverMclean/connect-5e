"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import CharacterSheetStats from "./stats/CharacterSheetStats";
import CharacterSheetCombat from "./combat/CharacterSheetCombat";
import CharacterSheetMagic from "./magic/CharacterSheetMagic";
import CharacterSheetInventory from "./inventory/CharacterSheetInventory";
import CharacterSheetProfile from "./profile/CharacterSheetProfile";

const styles = {
  bottomBarButton:
    "flex justify-center items-center rounded-full duration-300 px-2 gap-2",
};

const themes = {
  green: {
    bg: "bg-green-950",
    highlight: "bg-green-700",
    border: "border-green-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-green-900",
  },
  red: {
    bg: "bg-red-950",
    highlight: "bg-red-700",
    border: "border-red-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-red-900",
  },
  blue: {
    bg: "bg-blue-950",
    highlight: "bg-blue-700",
    border: "border-blue-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-blue-900",
  },
  purple: {
    bg: "bg-purple-950",
    highlight: "bg-purple-700",
    border: "border-purple-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-purple-900",
  },
  yellow: {
    bg: "bg-yellow-700",
    highlight: "bg-yellow-500",
    border: "border-yellow-500",
    text: "text-[var(--background)]",
    shadow: "shadow-yellow-900",
  },
};

function CharacterSheet({ characterSheet, dm, initTheme }) {
  const [theme, setTheme] = useState(themes[initTheme ?? "red"]);
  const divRef = useRef(null);

  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const [selected, setSelected] = useState("stats");

  const changeTab = (name) => {
    scrollToTop();
    setSelected(name);
  };

  const tab = (icon, name) => (
    <div
      className={`${styles.bottomBarButton} ${
        selected === name ? theme.highlight : ""
      }`}
      onClick={() => changeTab(name)}
    >
      <Image
        src={"/icons/" + icon + ".png"}
        width={24}
        height={24}
        alt={name}
      />
      <p className={`font-semibold hidden ${!dm && "md:block"}`}>{name}</p>
    </div>
  );

  const openStatsSettings = () => {};

  const healthPercentage =
    (characterSheet.health.current / characterSheet.health.max) * 100; // Calculate percentage

  const hpCell = (
    <div className="flex flex-col gap-1">
      <div
        className="justify-center text-center flex flex-col pt-[2px] gap-1 rounded-lg border border-[var(--foreground)]"
        style={{
          background: `linear-gradient(to right, #166534 ${healthPercentage}%, #991b1b ${healthPercentage}%)`,
        }}
      >
        <p className="text-lg font-bold px-1">
          <span className=" rounded-lg px-1">
            {characterSheet.health.current}
          </span>
          {"/"}
          <span className=" rounded-lg px-1">{characterSheet.health.max}</span>
        </p>
      </div>
      <p className="text-xs text-center">Hit Points</p>
    </div>
  );

  const hitDie = (
    <div className="flex flex-col justify-end items-center gap-1">
      <div className="items-end justify-center gap-1 text-center flex flex-wrap py-1 border rounded-xl bg-yellow-800 px-[4px]">
        {characterSheet.getAllHitDice().map((dice, index) => (
          <div key={index} className={`rounded-full p-[2px] bg-black`}>
            <Image
              src={`/icons/dice/dice-${dice}-white.png`}
              width={12}
              height={12}
              alt={`${dice} hit die`}
            />
          </div>
        ))}
        {/* {Array.from(
          { length: characterSheet.getAllHitDice().length },
          (_, index) => (
            <div key={index} className={`rounded-full p-[2px] bg-black`}>
              <Image
                src={`/icons/dice/dice-${characterSheet.health.hitDice.dice}${
                  index < characterSheet.health.hitDice.current ? "-white" : ""
                }.png`}
                width={12}
                height={12}
                alt={`${index} of ${characterSheet.health.hitDice.max} ${characterSheet.health.hitDice.dice} hit dice`}
              />
            </div>
          )
        )} */}
      </div>
      <p className="text-xs text-center">Hit Dice</p>
    </div>
  );

  const deathSaves = (
    <div className="flex flex-col gap-1">
      <div className="flex-1 justify-center flex gap-2">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs">Successes</p>
          <div className="w-[64px] h-[100%] py-1 flex justify-evenly items-center rounded-lg border border-[var(--foreground)] bg-green-800">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`rounded p-1 border border-white ${
                  index < characterSheet.health.deathSaves.successes &&
                  "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs">Failures</p>
          <div
            className={`w-[64px] h-[100%] py-1 flex justify-evenly items-center rounded-lg border border-[var(--foreground)] bg-red-800`}
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`rounded p-1 border border-white ${
                  index < characterSheet.health.deathSaves.failures &&
                  "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-center">Death Saves</p>
    </div>
  );

  const getClassesString = (classes) => {
    return classes
      .map((c) =>
        `Lvl ${c.level} ${c.base.name}${
          c.subClass ? ` (${c.subClass.name})` : ""
        }`.trim()
      )
      .join(" | ");
  };

  const header = (
    <div className={`px-2 grid grid-cols-1 ${!dm && "md:grid-cols-2"} gap-2`}>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className={`text-lg font-bold`}>
            {characterSheet.profile.name}
          </div>
          <div className="text-xs">
            {characterSheet.race} | {getClassesString(characterSheet.class)}
          </div>
        </div>
        <div className="flex-col flex gap-1">
          <div className="flex-1 py-1 px-2 mt-1 flex items-center justify-center border border-white rounded-lg bg-slate-800">
            <p className="text-xs">{characterSheet.speed.walk}ft</p>
          </div>
          <p className="text-xs text-center">Speed</p>
        </div>
        <div className="flex-col flex gap-1">
          <div className="flex-1 py-1 px-2 mt-1 flex items-center justify-center border border-white rounded-lg bg-slate-800">
            <p className="text-xs">
              {characterSheet.conditions.length > 0
                ? characterSheet.conditions[0].name
                : "None"}
            </p>
          </div>
          <p className="text-xs text-center">Condition</p>
        </div>
      </div>
      <div
        className={`flex items-end justify-between ${
          !dm && "md:justify-around xl:justify-end"
        }  gap-2`}
      >
        {hpCell}
        {hitDie}
        {deathSaves}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-full ${dm && "max-w-sm"} ${theme.text}`}>
      {/* Inner Fixed Header */}
      <header
        className={`sticky top-0 z-10 ${theme.bg} border-b-2 ${theme.border}`}
      >
        <div className="py-1 md:p-2">{header}</div>
        <div className="h-[48px] flex justify-evenly py-2 flex-grow-0 flex-shrink-0 flex-auto sticky top-0">
          {tab("stats_chart_sharp_icon_48", "stats")}
          {tab("sword_fill_icon_48", "combat")}
          {characterSheet.spellcasting &&
            tab("magic_wand_fill_icon_48", "magic")}
          {tab("treasure_chest_icon_48", "inventory")}
          {tab("bust_icon_48", "profile")}
        </div>
      </header>

      {/* Inner Scrollable Content */}
      <div className="flex-grow overflow-y-auto" ref={divRef}>
        <div className="flex-1 overflow-auto">
          <div
            className={
              "fadeInOut " + (selected === "stats" ? "visible" : "hide")
            }
          >
            <CharacterSheetStats
              characterSheet={characterSheet}
              theme={theme}
              dm={dm}
            />
          </div>
          <div
            className={
              "fadeInOut " + (selected === "combat" ? "visible" : "hide")
            }
          >
            <CharacterSheetCombat
              characterSheet={characterSheet}
              theme={theme}
              dm={dm}
            />
          </div>
          {characterSheet.spellcasting && (
            <div
              className={
                "fadeInOut " + (selected === "magic" ? "visible" : "hide")
              }
            >
              <CharacterSheetMagic
                characterSheet={characterSheet}
                theme={theme}
                dm={dm}
              />
            </div>
          )}
          <div
            className={
              "fadeInOut " + (selected === "inventory" ? "visible" : "hide")
            }
          >
            <CharacterSheetInventory
              characterSheet={characterSheet}
              theme={theme}
              dm={dm}
            />
          </div>
          <div
            className={
              "fadeInOut " + (selected === "profile" ? "visible" : "hide")
            }
          >
            <CharacterSheetProfile
              characterSheet={characterSheet}
              theme={theme}
              dm={dm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterSheet;
