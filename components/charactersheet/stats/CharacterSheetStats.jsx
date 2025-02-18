import Image from "next/image";
import React from "react";

const styles = {
  statWrapper:
    "text-center rounded-lg p-1 border border-1 border-yellow-700 bg-red-950 flex flex-col shadow-md shadow-yellow-950",
  passiveWrapper:
    "text-center rounded-lg p-1 border border-1 border-red-800 bg-slate-800 shadow-md shadow-red-950",
  statLabel: "text-xs truncate",
  statPrimary: "text-3xl font-bold",
  statSecondary: "font-semibold flex-1",
};

function getModifier(level) {
  var mod = Math.floor(parseFloat((level - 10) / 2));
  return (mod < 0 ? "" : "+") + mod;
}

function CharacterSheetStats() {
  const stats = {
    strength: { value: 16, proficient: true }, // Core stat for a Strength-based Fighter
    dexterity: { value: 12, proficient: false }, // Moderate for initiative & AC
    constitution: { value: 14, proficient: true }, // Essential for HP & durability
    intelligence: { value: 10, proficient: false }, // Not crucial for Fighters
    wisdom: { value: 12, proficient: false }, // Useful for Perception & Survival
    charisma: { value: 10, proficient: false }, // Fighters don’t usually need high Charisma
  };

  const skills = [
    { name: "Acrobatics", mod: 2, proficient: false, expert: false }, // Dexterity
    { name: "Animal Handling", mod: 2, proficient: false, expert: false }, // Wisdom
    { name: "Arcana", mod: 1, proficient: false, expert: false }, // Intelligence
    { name: "Athletics", mod: 5, proficient: true, expert: false }, // Strength (Important for Fighters)
    { name: "Deception", mod: 2, proficient: false, expert: false }, // Charisma
    { name: "History", mod: 1, proficient: false, expert: false }, // Intelligence
    { name: "Insight", mod: 2, proficient: false, expert: false }, // Wisdom
    { name: "Intimidation", mod: 4, proficient: true, expert: false }, // Charisma (Often useful for Fighters)
    { name: "Investigation", mod: 1, proficient: false, expert: false }, // Intelligence
    { name: "Medicine", mod: 2, proficient: false, expert: false }, // Wisdom
    { name: "Nature", mod: 1, proficient: false, expert: false }, // Intelligence
    { name: "Perception", mod: 4, proficient: true, expert: false }, // Wisdom (Essential for awareness)
    { name: "Performance", mod: 2, proficient: false, expert: false }, // Charisma
    { name: "Persuasion", mod: 2, proficient: false, expert: false }, // Charisma
    { name: "Religion", mod: 1, proficient: false, expert: false }, // Intelligence
    { name: "Sleight of Hand", mod: 2, proficient: false, expert: false }, // Dexterity
    { name: "Stealth", mod: 2, proficient: false, expert: false }, // Dexterity
    { name: "Survival", mod: 4, proficient: true, expert: false }, // Wisdom (Useful for tracking, wilderness survival)
  ];

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
        <div className="flex-1 text-end text-xs flex gap-1">
          <span className="bg-yellow-500 text-black font-bold px-1 rounded-full">
            P
          </span>
          = Proficient
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
      {passiveStats}
      {skillStats}
    </div>
  );
}

export default CharacterSheetStats;
