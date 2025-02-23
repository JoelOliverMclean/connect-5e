import React, { useState } from "react";
import Image from "next/image";
import CombatFeatures from "./CombatFeatures";

function CombatReactions({ characterSheet, theme }) {
  const reactions = characterSheet
    .features()
    .filter((p) => p.type === "reaction");

  if (reactions.length > 0)
    return (
      <CombatFeatures type="Reactions" features={reactions} theme={theme} />
    );
  else return <></>;
}

export default CombatReactions;
