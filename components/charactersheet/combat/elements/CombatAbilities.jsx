import Image from "next/image";
import React, { useState } from "react";
import { abilities } from "@/mockdata/characterSheetMockData";

function CombatAbilities() {
  const [expandedAbilities, setExpandedAbilities] = useState({});
  const [isAbilityCollapsed, setIsAbilityCollapsed] = useState(
    abilities.reduce((acc, ability) => {
      acc[ability.name] = true;
      return acc;
    }, {})
  );

  const toggleAbilityDescriptionWrapping = (abilityName) => {
    const isExpanding = !expandedAbilities[abilityName];

    setExpandedAbilities((prev) => ({
      ...prev,
      [abilityName]: isExpanding,
    }));

    if (!isExpanding) {
      setTimeout(() => {
        setIsAbilityCollapsed((prev) => ({
          ...prev,
          [abilityName]: true,
        }));
      }, 300);
    } else {
      setIsAbilityCollapsed((prev) => ({
        ...prev,
        [abilityName]: false,
      }));
    }
  };

  return (
    <>
      <h2 className="text-center text-xl">Abilities</h2>
      {abilities.map((ability) => (
        <div
          key={ability.name}
          className="p-2 border border-red-600 bg-red-950 rounded-lg flex flex-col gap-1"
        >
          <h4 className="font-bold">{ability.name}</h4>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedAbilities[ability.name] ? "max-h-40" : "max-h-5"
            }`}
          >
            <p
              className={`text-xs ${
                !expandedAbilities[ability.name] &&
                isAbilityCollapsed[ability.name]
                  ? "one-line-ellipsis"
                  : ""
              }`}
            >
              {ability.description}
            </p>
          </div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => toggleAbilityDescriptionWrapping(ability.name)}
          >
            <Image
              src="/icons/down_arrow_icon.png"
              width={24}
              height={24}
              alt="expand ability description"
              className={`transition-transform duration-300 ${
                expandedAbilities[ability.name] ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default CombatAbilities;
