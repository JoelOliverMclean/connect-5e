const AC = 13;
const attacksPerAction = 2;
const pb = 2;

const actionsInCombat = [
  {
    name: "Attack",
    description:
      "You make a weapon or unarmed strike against a creature within range. This can include melee, ranged, or spell attacks depending on your abilities and equipment.",
  },
  {
    name: "Dash",
    description:
      "You use your action to move up to twice your speed this turn. This is useful for closing distance or escaping danger quickly.",
  },
  {
    name: "Disengage",
    description:
      "You move without provoking opportunity attacks. This is useful when you need to retreat from melee combat without taking damage.",
  },
  {
    name: "Dodge",
    description:
      "You focus entirely on avoiding attacks, granting disadvantage on attack rolls against you until your next turn. You also gain advantage on Dexterity saving throws.",
  },
  {
    name: "Grapple",
    description:
      "You attempt to seize a creature using a Strength (Athletics) check contested by their Strength (Athletics) or Dexterity (Acrobatics). A grappled creature has its speed reduced to 0.",
  },
  {
    name: "Help",
    description:
      "You assist an ally, granting them advantage on an ability check or attack roll. You must be within range to provide meaningful help.",
  },
  {
    name: "Hide",
    description:
      "You attempt to conceal yourself from enemies using a Dexterity (Stealth) check. This is useful for ambushes or avoiding detection.",
  },
  {
    name: "Improvise",
    description:
      "You take an action that isn't covered by the standard actions, such as attempting a creative maneuver or interacting with the environment in a unique way.",
  },
  {
    name: "Influence",
    description:
      "You attempt to persuade, intimidate, or deceive a creature through roleplay and a Charisma-based check. This can be used in social encounters during combat.",
  },
  {
    name: "Magic",
    description:
      "You cast a spell using a spell slot or cantrip. The spell must be one you know and have prepared, and you must meet its casting requirements.",
  },
  {
    name: "Ready",
    description:
      "You prepare an action to be triggered by a specific event. For example, 'I attack if the goblin moves within range.' This allows you to act outside your turn.",
  },
  {
    name: "Search",
    description:
      "You spend your action to look for something specific, such as a hidden creature, an object, or an escape route, using a Wisdom (Perception) or Intelligence (Investigation) check.",
  },
  {
    name: "Shove",
    description:
      "You attempt to push a creature using a Strength (Athletics) check contested by their Strength (Athletics) or Dexterity (Acrobatics). You can push them 5 feet or knock them prone.",
  },
  {
    name: "Study",
    description:
      "You analyze a creature, object, or situation using an Intelligence-based check. This can reveal information about resistances, weaknesses, or other key details.",
  },
  {
    name: "Utilise",
    description:
      "You interact with an item or object in a meaningful way, such as activating a magical device, pulling a lever, or drinking a potion.",
  },
];

const stats = {
  strength: { value: 16, proficient: true }, // Core stat for a Strength-based Fighter
  dexterity: { value: 12, proficient: false }, // Moderate for initiative & AC
  constitution: { value: 14, proficient: true }, // Essential for HP & durability
  intelligence: { value: 10, proficient: false }, // Not crucial for Fighters
  wisdom: { value: 12, proficient: false }, // Useful for Perception & Survival
  charisma: { value: 10, proficient: false }, // Fighters don’t usually need high Charisma
};

const skills = [
  { name: "Acrobatics", mod: 2, proficient: false, expert: false }, // Dexterity
  { name: "Animal Handling", mod: 2, proficient: false, expert: false }, // Wisdom
  { name: "Arcana", mod: 1, proficient: false, expert: false }, // Intelligence
  { name: "Athletics", mod: 7, proficient: true, expert: true }, // Strength (Important for Fighters)
  { name: "Deception", mod: 2, proficient: false, expert: false }, // Charisma
  { name: "History", mod: 1, proficient: false, expert: false }, // Intelligence
  { name: "Insight", mod: 2, proficient: false, expert: false }, // Wisdom
  { name: "Intimidation", mod: 4, proficient: true, expert: false }, // Charisma (Often useful for Fighters)
  { name: "Investigation", mod: 1, proficient: false, expert: false }, // Intelligence
  { name: "Medicine", mod: 2, proficient: false, expert: false }, // Wisdom
  { name: "Nature", mod: 1, proficient: false, expert: false }, // Intelligence
  { name: "Perception", mod: 4, proficient: true, expert: false }, // Wisdom (Essential for awareness)
  { name: "Performance", mod: 2, proficient: false, expert: false }, // Charisma
  { name: "Persuasion", mod: 2, proficient: false, expert: false }, // Charisma
  { name: "Religion", mod: 1, proficient: false, expert: false }, // Intelligence
  { name: "Sleight of Hand", mod: 2, proficient: false, expert: false }, // Dexterity
  { name: "Stealth", mod: 2, proficient: false, expert: false }, // Dexterity
  { name: "Survival", mod: 4, proficient: true, expert: false }, // Wisdom (Useful for tracking, wilderness survival)
];

const weapons = [
  {
    name: "Longsword",
    range: "Melee",
    hitBonusOrDC: "+5",
    damage: "1d8 slashing (1d10 versatile)",
    equipped: true,
  },
  {
    name: "Dagger",
    range: "Melee/20-60 ft",
    hitBonusOrDC: "+5",
    damage: "1d4 piercing",
    equipped: false,
  },
  {
    name: "Shortbow",
    range: "80-320 ft",
    hitBonusOrDC: "+5",
    damage: "1d6 piercing",
    equipped: false,
  },
  {
    name: "Javelin",
    range: "30-120 ft",
    hitBonusOrDC: "+5",
    damage: "1d6 piercing",
    equipped: false,
  },
];

const abilities = [
  {
    name: "Grappling Pin",
    description:
      "You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.",
  },
  {
    name: "Primeval Awareness",
    description:
      "Beginning at 3rd level, you can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn’t reveal the creatures’ location or number.",
  },
];

const bonusActions = [
  {
    name: "Two-Weapon Fighting",
    description:
      "When you take the Attack action on your turn and attack with a Light weapon, you can make one extra attack as a Bonus Action later on the same turn. That extra attack must be made with a different Light weapon, and you don't add your ability modifier to the extra attack's damage unless that modifier is negative. For example, you can attack with a Shortsword in one hand and a Dagger in the other using the Attack action and a Bonus Action, but you don't add your Strength or Dexterity modifier to the damage roll of the Bonus Action unless that modifier is negative.",
  },
  {
    name: "Hunter's Mark",
    description: "View spell",
  },
];

export {
  actionsInCombat,
  AC,
  attacksPerAction,
  pb,
  stats,
  skills,
  weapons,
  abilities,
  bonusActions,
};
