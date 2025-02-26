import Image from "next/image";
import React from "react";

function CharacterSheetHeader({ characterSheet, theme, dm }) {
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

  return (
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
}

export default CharacterSheetHeader;
