import React, { useState } from "react";
import { bonusActions } from "@/mockdata/characterSheetMockData";
import Image from "next/image";

function CombatBonusActions() {
  const [expandedBonusAction, setExpandedBonusActions] = useState({});
  const [isBonusActionCollapsed, setIsBonusActionCollapsed] = useState(
    bonusActions.reduce((acc, bonusAction) => {
      acc[bonusAction.name] = true;
      return acc;
    }, {})
  );

  const toggleBonusActionDescriptionWrapping = (bonusActionName) => {
    const isExpanding = !expandedBonusAction[bonusActionName];

    setExpandedBonusActions((prev) => ({
      ...prev,
      [bonusActionName]: isExpanding,
    }));

    if (!isExpanding) {
      setTimeout(() => {
        setIsBonusActionCollapsed((prev) => ({
          ...prev,
          [bonusActionName]: true,
        }));
      }, 300);
    } else {
      setIsBonusActionCollapsed((prev) => ({
        ...prev,
        [bonusActionName]: false,
      }));
    }
  };

  return (
    <>
      <h2 className="text-center text-xl">Bonus Actions</h2>
      {bonusActions.map((bonusAction) => (
        <div
          key={bonusAction.name}
          className="p-2 border border-red-600 bg-red-950 rounded-lg flex flex-col gap-1"
        >
          <h4 className="font-bold">{bonusAction.name}</h4>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedBonusAction[bonusAction.name] ? "max-h-40" : "max-h-5"
            }`}
          >
            <p
              className={`text-xs ${
                !expandedBonusAction[bonusAction.name] &&
                isBonusActionCollapsed[bonusAction.name]
                  ? "one-line-ellipsis"
                  : ""
              }`}
            >
              {bonusAction.description}
            </p>
          </div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={() =>
              toggleBonusActionDescriptionWrapping(bonusAction.name)
            }
          >
            <Image
              src="/icons/down_arrow_icon.png"
              width={24}
              height={24}
              alt="expand bonus action description"
              className={`transition-transform duration-300 ${
                expandedBonusAction[bonusAction.name] ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default CombatBonusActions;
