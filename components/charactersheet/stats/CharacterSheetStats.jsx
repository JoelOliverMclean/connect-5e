import Image from "next/image";
import React from "react";
import { pb, stats, skills } from "@/mockdata/characterSheetMockData";
import { getModifier } from "@/utils/CharacterSheetUtils";

const styles = {
  statWrapper:
    "text-center rounded-lg p-1 border border-1 flex flex-col shadow-md",
  savesWrapper:
    "text-center rounded-lg p-1 border border-1 flex flex-col shadow-md",
  passiveWrapper: "text-center rounded-lg p-1 border border-1 shadow-md",
  statLabel: "text-xs truncate",
  statPrimary: "text-3xl font-bold",
  statSecondary: "font-semibold flex-1",
};

function CharacterSheetStats({ characterSheet, theme, dm }) {
  const statBlock = (label, stat) => (
    <div
      className={`${styles.statWrapper} ${theme.bg} ${theme.border} ${theme.shadow}`}
    >
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
    <div className="flex flex-col gap-2">
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
    <div
      className={`${styles.savesWrapper} ${theme.bg} ${theme.border} ${theme.shadow}`}
    >
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
      <div className="flex-1 text-end text-xs flex gap-1 px-1 items-start">
        <span className="bg-yellow-500 text-black font-bold px-1 rounded-full">
          P
        </span>
        = Proficient
      </div>
    </div>
  );

  const passiveBlock = (name, value) => (
    <div
      className={`${styles.passiveWrapper} ${theme.bg} ${theme.border} ${theme.shadow}`}
    >
      <h3 className={styles.statLabel}>{name}</h3>
      <p className={styles.statPrimary}>{value}</p>
    </div>
  );

  const showPassiveStatsHelp = () => {};

  const passiveStats = (
    <div className="flex flex-col gap-2">
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

  const proficiencyStar = <span className="text-yellow-500 font-bold">*</span>;

  const expertiseStars = <span className="text-yellow-500 font-bold">**</span>;

  const skillCell = (skill) => (
    <div
      className={`flex justify-between gap-1 items-end shadow rounded-md border px-1 md:px-2 md:py-1 ${theme.border} ${theme.shadow} ${theme.bg}`}
    >
      <p className="flex-1 truncate text-sm">{skill.name}</p>
      <p>
        {skill.expert
          ? expertiseStars
          : skill.proficient
          ? proficiencyStar
          : ""}
      </p>
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
        <div
          className={`grid grid-cols-2 ${
            !dm && "md:grid-cols-3 xl:grid-cols-4"
          } gap-2`}
        >
          {characterSheet.skills.map((skill) => (
            <div key={skill.name}>{skillCell(skill)}</div>
          ))}
        </div>
        <div className="flex-1 text-end text-xs flex gap-3">
          <div className="flex gap-1">{proficiencyStar}= Proficiency</div>
          <div className="flex gap-1">{expertiseStars}= Expertise</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-2">
      <div
        className={`grid grid-cols-1 gap-4 ${
          !dm && "md:grid-cols-2 xl:grid-cols-3 md:gap-5"
        }`}
      >
        {mainStatBlock}
        {saveStats}
        {passiveStats}
      </div>
      {skillStats}
    </div>
  );
}

export default CharacterSheetStats;
