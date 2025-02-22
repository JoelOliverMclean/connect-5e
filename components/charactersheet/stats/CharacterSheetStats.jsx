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

function CharacterSheetStats({ characterSheet }) {
  const statBlock = (label, stat) => (
    <div className={styles.statWrapper}>
      <h3 className={styles.statLabel}>{label}</h3>
      <p className={styles.statPrimary}>{getModifier(stat)}</p>
      <div className="flex items-end">
        <p className="flex-1"></p>
        <p className={styles.statSecondary}>{stat}</p>
        <div className="flex-1 text-end text-xs flex justify-end">
          {/* <p className="bg-yellow-500 text-black font-bold px-1 rounded-full">
            {stat.proficient && "P"}
          </p> */}
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
          {statBlock("Strength", characterSheet.abilityScores.strength)}
          {statBlock("Dexterity", characterSheet.abilityScores.dexterity)}
          {statBlock("Constitution", characterSheet.abilityScores.constitution)}
          {statBlock("Intelligence", characterSheet.abilityScores.intelligence)}
          {statBlock("Wisdom", characterSheet.abilityScores.wisdom)}
          {statBlock("Charisma", characterSheet.abilityScores.charisma)}
        </div>
      </div>
    </div>
  );

  function getSaveModifierString(mod) {
    return (mod < 0 ? "" : "+") + mod;
  }

  const savesBlock = (label, mod, saveProficiencies) => (
    <div className={styles.savesWrapper}>
      <h3 className={styles.statLabel}>{label}</h3>
      <div className="flex items-end">
        <p className="flex-1"></p>
        <p className={styles.statPrimary}>{getSaveModifierString(mod)}</p>
        <div className="flex-1 text-end text-xs flex justify-end">
          <p className="bg-yellow-500 text-black font-bold px-1 rounded-full">
            {saveProficiencies.some((p) => p === label.toLowerCase()) && "P"}
          </p>
        </div>
      </div>
    </div>
  );

  const showSavingStatsHelp = () => {};

  const saveStats = (
    <div className="flex flex-col gap-2">
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
          {savesBlock(
            "Strength",
            characterSheet.saves.strength,
            characterSheet.proficiency.saves
          )}
          {savesBlock(
            "Dexterity",
            characterSheet.saves.dexterity,
            characterSheet.proficiency.saves
          )}
          {savesBlock(
            "Constitution",
            characterSheet.saves.constitution,
            characterSheet.proficiency.saves
          )}
          {savesBlock(
            "Intelligence",
            characterSheet.saves.intelligence,
            characterSheet.proficiency.saves
          )}
          {savesBlock(
            "Wisdom",
            characterSheet.saves.wisdom,
            characterSheet.proficiency.saves
          )}
          {savesBlock(
            "Charisma",
            characterSheet.saves.charisma,
            characterSheet.proficiency.saves
          )}
        </div>
      </div>
      <div className="flex-1 text-end text-xs flex gap-1 px-1">
        <span className="bg-yellow-500 text-black font-bold px-1 rounded-full">
          P
        </span>
        = Proficient
      </div>
    </div>
  );

  const passiveBlock = (name, value) => (
    <div className={styles.passiveWrapper}>
      <h3 className={styles.statLabel}>{name}</h3>
      <p className={styles.statPrimary}>{value}</p>
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
        {passiveBlock("Perception", characterSheet.senses.passives.perception)}
        {passiveBlock("Insight", characterSheet.senses.passives.insight)}
        {passiveBlock(
          "Investigation",
          characterSheet.senses.passives.investigation
        )}
      </div>
    </div>
  );

  const skillCell = (skill) => (
    <div
      className={`flex items-end shadow shadow-red-800 rounded-md border px-1 ${
        skill.proficient ? "border-yellow-400" : "border-red-950"
      } ${skill.expert ? "bg-yellow-800" : "bg-red-950"}`}
    >
      <div className="flex-1 text-sm">
        <p>
          {skill.name}
          <span className="text-yellow-500">
            {skill.expert ? "**" : skill.proficient ? "*" : ""}
          </span>
        </p>
      </div>
      <div className="font-bold">{getModifier(skill.mod)}</div>
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
          {characterSheet.skills.map((skill) => (
            <div key={skill.name}>{skillCell(skill)}</div>
          ))}
        </div>
        <div className="flex-1 text-end text-xs flex gap-3">
          <div className="flex gap-1">
            <div className="border border-yellow-500 bg-red-950 px-2 font-bold rounded-md"></div>
            = Proficiency
          </div>
          <div className="flex gap-1">
            <div className="border border-yellow-500 bg-yellow-800 px-2 font-bold rounded-md"></div>
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
