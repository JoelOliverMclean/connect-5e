"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import CharacterSheetStats from "./stats/CharacterSheetStats";
import CharacterSheetCombat from "./combat/CharacterSheetCombat";
import CharacterSheetMagic from "./magic/CharacterSheetMagic";
import CharacterSheetInventory from "./inventory/CharacterSheetInventory";
import CharacterSheetProfile from "./profile/CharacterSheetProfile";
import CharacterSheetHeader from "./header/CharacterSheetHeader";
import {
  Archive,
  ChartNoAxesColumn,
  Swords,
  User,
  WandSparkles,
} from "lucide-react";

const styles = {
  bottomBarButton:
    "flex justify-center items-center rounded-full duration-300 px-2 gap-2",
};

const themes = {
  green: {
    bg: "bg-green-950",
    highlight: "bg-green-700",
    hoverBG: "hover:bg-green-700",
    border: "border-green-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-green-900",
  },
  red: {
    bg: "bg-red-950",
    highlight: "bg-red-700",
    hoverBG: "hover:bg-red-700",
    border: "border-red-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-red-900",
  },
  blue: {
    bg: "bg-blue-950",
    highlight: "bg-blue-700",
    hoverBG: "hover:bg-blue-700",
    border: "border-blue-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-blue-900",
  },
  purple: {
    bg: "bg-purple-950",
    highlight: "bg-purple-700",
    hoverBG: "hover:bg-purple-700",
    border: "border-purple-700",
    text: "text-[var(--foreground)]",
    shadow: "shadow-purple-900",
  },
  yellow: {
    bg: "bg-yellow-700",
    highlight: "bg-yellow-500",
    hoverBG: "hover:bg-yellow-500",
    border: "border-yellow-500",
    text: "text-[var(--background)]",
    shadow: "shadow-yellow-900",
  },
};

const SELECTED_TAB_KEY = "selectedCharacterSheetTab";

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
  useEffect(() => {
    setSelected(localStorage.getItem(SELECTED_TAB_KEY) || "stats");
  }, []);

  const changeTab = (name) => {
    scrollToTop();
    setSelected(name);
    localStorage.setItem(SELECTED_TAB_KEY, name);
  };

  const tab = (icon, name) => (
    <div
      className={`${styles.bottomBarButton} ${
        selected === name ? theme.highlight : ""
      }`}
      onClick={() => changeTab(name)}
    >
      {icon}
      <p className={`font-semibold hidden ${!dm && "md:block"}`}>{name}</p>
    </div>
  );

  const openStatsSettings = () => {};

  return (
    <div className={`flex flex-col h-full ${dm && "max-w-sm"} ${theme.text}`}>
      {/* Inner Fixed Header */}
      <header
        className={`sticky top-0 z-10 ${theme.bg} border-b-2 ${theme.border}`}
      >
        <div className="py-1 md:p-2">
          <CharacterSheetHeader
            characterSheet={characterSheet}
            theme={theme}
            dm={dm}
          />
        </div>
        <div className="h-[48px] flex justify-evenly py-2 flex-grow-0 flex-shrink-0 flex-auto sticky top-0">
          {tab(<ChartNoAxesColumn />, "stats")}
          {tab(<Swords />, "combat")}
          {characterSheet.spellcasting && tab(<WandSparkles />, "magic")}
          {tab(<Archive />, "inventory")}
          {tab(<User />, "profile")}
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
              inventory={characterSheet.inventory}
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
