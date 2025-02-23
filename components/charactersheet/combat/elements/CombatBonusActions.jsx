import React, { useState } from "react";
import Image from "next/image";
import CombatFeatures from "./CombatFeatures";

function CombatBonusActions({ characterSheet, theme }) {
  const bonusActions = characterSheet
    .features()
    .filter((p) => p.type === "bonus action");

  if (bonusActions.length > 0)
    return (
      <CombatFeatures
        type="Bonus Actions"
        features={bonusActions}
        theme={theme}
      />
    );
  else return <></>;
}

export default CombatBonusActions;
