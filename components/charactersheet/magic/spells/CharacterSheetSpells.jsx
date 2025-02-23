import Popup from "@/components/popup/Popup";
import React, { useState } from "react";

function CharacterSheetSpells({ spells, spellSlots, theme }) {
  const [selectedSpell, setSelectedSpell] = useState(null);

  const spellPopup = (
    <Popup onDismiss={(e) => setSelectedSpell(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] md:min-w-[30vw] md:max-w-[60vw] lg:max-w-[40vw] flex flex-col gap-1`}
      >
        <h2 className="text-xl font-bold text-center">{selectedSpell?.name}</h2>
        <div className="text-xs flex flex-col gap-1">
          <p className="text-start flex gap-1">
            <span className="font-bold">Casting Time:</span>
            {selectedSpell?.castingTime}
          </p>
          <p className="text-start flex gap-1">
            <span className="font-bold">Range:</span>
            {selectedSpell?.range}
          </p>
          <p className="text-start flex gap-1">
            <span className="font-bold">Components:</span>
            {selectedSpell?.verbal && "V"} {selectedSpell?.somatic && "S"}{" "}
            {selectedSpell?.material && "M"}
          </p>
          <p className="text-start flex gap-1">
            <span className="font-bold">Duration:</span>
            {selectedSpell?.duration}
          </p>
          <p className="text-xs">{selectedSpell?.description}</p>
        </div>
      </div>
    </Popup>
  );

  const cantrips = spells.filter((s) => s.spell.level === 0);
  const level1Spells = spells.filter((s) => s.spell.level === 1);
  const level2Spells = spells.filter((s) => s.spell.level === 2);

  const spellDisplay = (spell, prepared) => (
    <div
      className={`flex gap-2 shadow items-start rounded-md border py-1 ps-2 pe-1 md:py-2 md:px-3 ${theme.border} ${theme.shadow} ${theme.bg}`}
      key={spell.name}
      onClick={(e) => setSelectedSpell(spell)}
    >
      <div className="pt-1">
        <div
          className={`w-[12px] h-[12px] rounded-full border ${theme.border} ${
            prepared && "bg-white"
          }`}
        ></div>
      </div>
      <p className="flex-1 text-sm">{spell.name}</p>
    </div>
  );

  const slotCounter = (level) => (
    <div className="flex gap-1 items-center">
      <p>Slots:</p>
      {Array.from({ length: spellSlots[level].max }, (_, index) => (
        <div
          key={index}
          className={`flex items-center justify-center w-[18px] h-[18px] rounded-full bg-black`}
        >
          <div
            key={index}
            className={`w-[12px] h-[12px] rounded-full p-1 ${
              index < spellSlots[level].current && "bg-white"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="gap-2 flex flex-col">
      <h2 className="text-center text-xl">Spells</h2>
      {cantrips.length > 0 && (
        <div className="flex flex-col gap-1">
          <h3 className="text-lg">Cantrips</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {cantrips.map((cantrip, index) =>
              spellDisplay(cantrip.spell, cantrip.prepared)
            )}
          </div>
        </div>
      )}
      {level1Spells.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="text-lg">Level 1</h3>
            {slotCounter("level1")}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {level1Spells.map((level1Spell, index) =>
              spellDisplay(level1Spell.spell, level1Spell.prepared)
            )}
          </div>
        </div>
      )}
      {level2Spells.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3 className="text-lg">Level 2</h3>
            {slotCounter("level2")}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {level2Spells.map((level2Spell, index) =>
              spellDisplay(level2Spell.spell, level2Spell.prepared)
            )}
          </div>
        </div>
      )}
      {selectedSpell?.name && spellPopup}
    </div>
  );
}

export default CharacterSheetSpells;
