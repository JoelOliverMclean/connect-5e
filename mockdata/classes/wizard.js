const wizard = {
  name: "Wizard",
  hitDice: "d6",
  subClasses: {
    necromancy: {
      name: "School of Necromancy",
      features: [
        {
          name: "Necromancy Savant",
          level: 3,
          type: "feature",
          description:
            "The gold and time you must spend to copy a necromancy spell into your spellbook is halved.",
          usage: null,
        },
        {
          name: "Grim Harvest",
          level: 3,
          type: "feature",
          description:
            "Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hp equal to twice the spell’s level, or three times its level if the spell belongs to the School of Necromancy. You don’t gain this benefit for killing constructs or undead.",
          usage: null,
        },
      ],
    },
  },
  features: [
    {
      name: "Arcane Recovery",
      level: 1,
      type: "reaction",
      description:
        "Once per day when you finish a short rest, you can choose expended spell slots up to 5th level to recover. The spell slots can have a combined level that is equal to or less than 2.",
      usage: {
        max: 1,
        current: 1,
        refresh: "short rest",
      },
    },
  ],
};

export default wizard;
