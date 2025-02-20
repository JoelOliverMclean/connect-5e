import Image from "next/image";
import React from "react";
import { pb, stats, skills } from "@/mockdata/characterSheetMockData";
import { getModifier } from "@/utils/CharacterSheetUtils";

const styles = {
  statWrapper:
    "text-center rounded-lg p-1 border border-1 border-yellow-700 bg-red-950 flex flex-col shadow-md shadow-yellow-950",
  savesWrapper:
    "text-center rounded-lg p-1 border border-1 border-white bg-yellow-800 flex flex-col shadow shadow-gray-500",
  passiveWrapper:
    "text-center rounded-lg p-1 border border-1 border-red-800 bg-slate-800 shadow-md shadow-red-950",
  statLabel: "text-xs truncate",
  statPrimary: "text-3xl font-bold",
  statSecondary: "font-semibold flex-1",
};

function CharacterSheetStats() {
  const statBlock = (label, stat) => (
    <div className={styles.statWrapper}>
      <h3 className={styles.statLabel}>{label}</h3>
      <p className={styles.statPrimary}>{getModifier(stat.value)}</p>
      <div className="flex items-end">
        <p className="flex-1"></p>
        <p className={styles.statSecondary}>{stat.value}</p>
        <div className="flex-1 text-end text-xs flex justify-end">
          <p className="bg-yellow-500 text-black font-bold px-1 rounded-full">
            {stat.proficient && "P"}
          </p>
        </div>
      </div>
    </div>
  );

  const showAbilityScoreHelp = () => {};

  const mainStatBlock = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center gap-1 items-center">
        <h2 className="text-center text-xl">Ability Scores</h2>
        <div className="p-1 cursor-pointer" onClick={showAbilityScoreHelp}>
          <Image
            src={"/icons/help_icon_48.png"}
            width={16}
            height={16}
            alt="ability scores help"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {statBlock("Strength", stats.strength)}
          {statBlock("Dexterity", stats.dexterity)}
          {statBlock("Constitution", stats.constitution)}
          {statBlock("Intelligence", stats.intelligence)}
          {statBlock("Wisdom", stats.wisdom)}
          {statBlock("Charisma", stats.charisma)}
        </div>
        <div className="flex-1 text-end text-xs flex gap-1 px-1">
          <span className="bg-yellow-500 text-black font-bold px-1 rounded-full">
            P
          </span>
          = Proficient
        </div>
      </div>
    </div>
  );

  function getSaveModifier(stat) {
    var mod =
      Math.floor(parseFloat((stat.value - 10) / 2)) +
      (stat.proficient ? pb : 0);
    return (mod < 0 ? "" : "+") + mod;
  }

  const savesBlock = (label, stat) => (
    <div className={styles.savesWrapper}>
      <h3 className={styles.statLabel}>{label}</h3>
      <p className={styles.statPrimary}>{getSaveModifier(stat)}</p>
    </div>
  );

  const showSavingStatsHelp = () => {};

  const saveStats = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center gap-1 items-center">
        <h2 className="text-center text-xl">Saving Throws</h2>
        <div className="p-1 cursor-pointer" onClick={showSavingStatsHelp}>
          <Image
            src={"/icons/help_icon_48.png"}
            width={16}
            height={16}
            alt="ability scores help"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {savesBlock("Strength", stats.strength)}
          {savesBlock("Dexterity", stats.dexterity)}
          {savesBlock("Constitution", stats.constitution)}
          {savesBlock("Intelligence", stats.intelligence)}
          {savesBlock("Wisdom", stats.wisdom)}
          {savesBlock("Charisma", stats.charisma)}
        </div>
      </div>
    </div>
  );

  const passiveBlock = (name) => (
    <div className={styles.passiveWrapper}>
      <h3 className={styles.statLabel}>{name}</h3>
      <p className={styles.statPrimary}>
        {10 + (skills.find((s) => s.name === name)?.mod ?? 0)}
      </p>
    </div>
  );

  const showPassiveStatsHelp = () => {};

  const passiveStats = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center gap-1 items-center">
        <h2 className="text-center text-xl">Passive Stats</h2>
        <div className="p-1 cursor-pointer" onClick={showPassiveStatsHelp}>
          <Image
            src={"/icons/help_icon_48.png"}
            width={16}
            height={16}
            alt="passive stats help"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {passiveBlock("Perception")}
        {passiveBlock("Insight")}
        {passiveBlock("Investigation")}
      </div>
    </div>
  );

  const skillCell = (skill) => (
    <div className="flex items-end shadow shadow-red-800 border px-1 border-red-800 bg-red-950 rounded-md">
      <div className="flex-1 text-sm">
        <p>
          {skill.name}
          <span className="text-yellow-500">
            {skill.expert ? "**" : skill.proficient ? "*" : ""}
          </span>
        </p>
      </div>
      <div className="font-bold">{getModifier(10 + skill.mod)}</div>
    </div>
  );

  const showSkillsHelp = () => {};

  const skillStats = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center gap-1 items-center">
        <h2 className="text-center text-xl">Skills</h2>
        <div className="p-1 cursor-pointer" onClick={showSkillsHelp}>
          <Image
            src={"/icons/help_icon_48.png"}
            width={16}
            height={16}
            alt="ability scores help"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <div key={skill.name}>{skillCell(skill)}</div>
          ))}
        </div>
        <div className="flex-1 text-end text-xs flex gap-3">
          <div>
            <span className="text-yellow-500 font-bold px-1 rounded-full">
              *
            </span>
            = Proficiency
          </div>
          <div>
            <span className="text-yellow-500 font-bold px-1 rounded-full">
              **
            </span>
            = Expertise
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 p-2">
      {mainStatBlock}
      {saveStats}
      {passiveStats}
      {skillStats}
    </div>
  );
}

export default CharacterSheetStats;
