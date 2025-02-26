import React from "react";
import ProfileNotes from "./notes/ProfileNotes";
import { isBreakpoint } from "@/utils/ScreenUtils";

function CharacterSheetProfile({ characterSheet, theme, dm }) {
  const proficienciesSection = (
    <div className="flex flex-col gap-2">
      <h3 className="text-center text-xl">Proficiencies</h3>
      <div
        className={`${theme.bg} border ${theme.border} shadow-md ${theme.shadow} rounded-lg p-2`}
      >
        <p className="text-sm">
          <span className="font-bold pe-2">Armor:</span>
          {characterSheet.proficiency.armor.length > 0
            ? characterSheet.proficiency.armor.join(", ")
            : "-"}
        </p>
        <p className="text-sm">
          <span className="font-bold pe-2">Weapons:</span>
          {characterSheet.proficiency.weapons.length > 0
            ? characterSheet.proficiency.weapons.join(", ")
            : "-"}
        </p>
        <p className="text-sm">
          <span className="font-bold pe-2">Tools:</span>
          {characterSheet.proficiency.tools.length > 0
            ? characterSheet.proficiency.tools.join(", ")
            : "-"}
        </p>
      </div>
    </div>
  );

  const languagesSection = (
    <div className="flex flex-col gap-2">
      <h3 className="text-center text-xl">Languages</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {characterSheet.languages.map((language) => (
          <div
            key={language}
            className={`${theme.bg} border ${theme.border} shadow-sm ${theme.shadow} px-2 py-1 rounded-full text-sm`}
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proficienciesSection}
        {languagesSection}
      </div>
      <ProfileNotes
        notes={characterSheet.notes}
        maxNotes={isBreakpoint("sm") ? "8" : "4"}
        theme={theme}
      />
    </div>
  );
}

export default CharacterSheetProfile;
