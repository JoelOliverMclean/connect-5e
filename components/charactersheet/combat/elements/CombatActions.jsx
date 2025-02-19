import React, { useState } from "react";
import Popup from "@/components/popup/Popup";
import { actionsInCombat } from "@/mockdata/characterSheetMockData";

function CombatActions() {
  const [selectedAction, setSelectedAction] = useState(null);

  const actionInCombatPopup = (
    <Popup onDismiss={(e) => setSelectedAction(null)}>
      <div className="bg-red-950 border-2 border-red-800 p-2 rounded-lg min-w-[85vw] flex flex-col items-center">
        <h2 className="text-2xl">{selectedAction?.name}</h2>
        <p>{selectedAction?.description}</p>
      </div>
    </Popup>
  );

  return (
    <div>
      <>
        <h3 className="text-center text-xl">Actions</h3>
        <div className="flex justify-center flex-wrap gap-[6px]">
          {actionsInCombat.map((action) => (
            <div
              key={action.name}
              className="bg-red-950 px-1 py-[2px] rounded-lg text-sm"
              onClick={(e) => setSelectedAction(action)}
            >
              {action.name}
            </div>
          ))}
        </div>
        {selectedAction?.name && actionInCombatPopup}
      </>
    </div>
  );
}

export default CombatActions;
