const swordOfOrcStrength = {
  name: "Sword of Orc Strength",
  description:
    "You have a +1 bonus to attack and damage rolls made with this sword due to the power of orc strength imbued within it.",
  range: "5ft",
  hitBonus: 6,
  damage: [{ dice: "1d8", bonus: 4, type: "slashing" }],
  properties: ["versatile"],
};

const crossbowLight = {
  name: "Crossbow, Light",
  range: "80/320ft",
  hitBonus: 5,
  damage: [{ dice: "1d8", bonus: 3, type: "piercing" }],
  properties: ["ammunition", "loading", "two-handed"],
};

const quarterstaff = {
  name: "Quarterstaff",
  description: "",
  range: "5ft",
  hitBonus: 2,
  damage: [{ dice: "1d6", bonus: 0, type: "bludgeoning" }],
  properties: ["versatile"],
};

export default { swordOfOrcStrength, crossbowLight };
