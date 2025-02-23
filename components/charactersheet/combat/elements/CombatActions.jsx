import React, { useState } from "react";
import Popup from "@/components/popup/Popup";
import { actionsInCombat } from "@/mockdata/characterSheetMockData";

function CombatActions({ theme }) {
  const [selectedActionInCombat, setSelectedActionInCombat] = useState(null);

  const actionInCombatPopup = (
    <Popup onDismiss={(e) => setSelectedActionInCombat(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] flex flex-col items-center`}
      >
        <h2 className="text-xl font-bold">{selectedActionInCombat?.name}</h2>
        <p className="text-sm">{selectedActionInCombat?.description}</p>
      </div>
    </Popup>
  );

  const actionsInCombatSection = (
    <>
      <h3 className="text-center text-xl">Actions in Combat</h3>
      <div className="flex justify-center flex-wrap gap-2">
        {actionsInCombat.map((action) => (
          <div
            key={action.name}
            className={`${theme.bg} px-1 py-[2px] rounded-lg border ${theme.border} text-sm ${theme.shadow} shadow-md`}
            onClick={(e) => setSelectedActionInCombat(action)}
          >
            {action.name}
          </div>
        ))}
      </div>
      {selectedActionInCombat?.name && actionInCombatPopup}
    </>
  );

  return actionsInCombatSection;
}

export default CombatActions;
