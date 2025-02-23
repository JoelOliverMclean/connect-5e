import Image from "next/image";
import React, { useState } from "react";
import CombatFeatures from "./CombatFeatures";

function CombatAbilities({ characterSheet, theme }) {
  const features = characterSheet.features().filter((p) => p.type === "action");

  if (features.length > 0)
    return (
      <CombatFeatures type="Abilities" features={features} theme={theme} />
    );
  else return <></>;
}

export default CombatAbilities;
