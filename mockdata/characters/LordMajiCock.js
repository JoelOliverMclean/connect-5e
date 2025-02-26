import { getModifierIntFromStat } from "@/utils/CharacterSheetUtils";
import fighter from "../classes/fighter";
import wizard from "../classes/wizard";
import armor from "../items/armor";
import weapons from "../items/weapons";
import magicItems from "../items/magicItems";
import cantrips from "../spells/cantrips";
import level1Spells from "../spells/level1Spells";
import level2Spells from "../spells/level2Spells";

const characterSheet = {
  conditions: [
    // e.g.
    // {
    //   name: "Poisoned",
    //   effect: "Disadvantage on attack rolls and ability checks.",
    // },
  ],
  exhaustion: {
    level: 0,
    effects: [],
  },
  armorClass: {
    base: 13,
    shield: {
      name: "Shield",
      modifier: 2,
    },
    armor: [armor.elvenChainShirt],
    other: [
      // e.g.
      // {
      //   name: "Unarmored Defense",
      //   modifier: 2
      // }
    ],
    total() {
      let totalAC = this.base;
      if (this.shield) {
        totalAC += this.shield.modifier;
      }
      totalAC += this.armor.reduce((sum, item) => sum + item.modifier, 0);
      totalAC += this.other.reduce((sum, item) => sum + item.modifier, 0);
      return totalAC;
    },
  },
  speed: {
    walk: 30,
    fly: 0,
    climb: 0,
    swim: 0,
  },
  getAllHitDice() {
    return this.class.reduce((hitDieArr, curClass) => {
      if (!curClass) return hitDieArr;

      return hitDieArr.concat(curClass.getHitDice());
    }, []);
  },
  health: {
    max: 17,
    current: 17,
    temporary: 0,
    deathSaves: {
      successes: 0,
      failures: 0,
    },
  },
  abilityScores: {
    strength: 11,
    dexterity: 14,
    constitution: 13,
    intelligence: 16,
    wisdom: 15,
    charisma: 8,
  },
  proficiency: {
    bonus: 2,
    armor: ["Chain Shirt"],
    weapons: ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow", "Light"],
    tools: [],
    saves: ["intelligence", "wisdom"],
  },
  languages: ["Common", "Gnomish", "Goblin", "Elvish"],
  features() {
    return this.class.reduce((arr, curr) => {
      if (!curr) return arr;

      const baseClassFeatures = curr.base.features ?? [];
      const subClassFeatures = curr.subClass?.features ?? [];

      return arr.concat(baseClassFeatures, subClassFeatures);
    }, []);
  },
  traits: {
    racial: [],
  },
  race: "Human",
  profile: {
    name: "Lord Maji Cock",
    gender: "Male",
    image: {
      url: null,
      width: 0,
      height: 0,
    },
    alignment: "Chaotic Good",
    player: {
      email: "",
      name: "Ben",
    },
    background: null,
    deity: null,
    patron: null,
  },
  getSpellSaveDC() {
    return (
      8 +
      this.proficiency.bonus +
      getModifierIntFromStat(this.abilityScores[this.spellcasting.ability])
    );
  },
  getSpellAttackBonus() {
    return (
      this.proficiency.bonus +
      getModifierIntFromStat(this.abilityScores[this.spellcasting.ability])
    );
  },
  spellcasting: {
    ability: "intelligence",
    spells: [
      { spell: cantrips.acidSplash, prepared: true },
      { spell: cantrips.light, prepared: true },
      { spell: cantrips.thunderclap, prepared: true },
      { spell: level1Spells.alarm, prepared: false },
      { spell: level1Spells.burningHands, prepared: false },
      { spell: level1Spells.catapult, prepared: true },
      { spell: level1Spells.disguiseSelf, prepared: false },
      { spell: level1Spells.falseLife, prepared: true },
      { spell: level1Spells.fogCloud, prepared: true },
      { spell: level1Spells.magicMissile, prepared: true },
      { spell: level1Spells.tensersFloatingDisk, prepared: false },
      { spell: level2Spells.phantasmalForce, prepared: true },
      { spell: level2Spells.shadowBlade, prepared: true },
    ],
    spellSlots: {
      level1: { max: 4, current: 4 },
      level2: { max: 2, current: 2 },
    },
  },
  class: [
    {
      base: wizard,
      subClass: wizard.subClasses.necromancy,
      level: 3,
      getHitDice() {
        return Array.from({ length: this.level }, (_, index) => {
          return this.base.hitDice;
        });
      },
    },
  ],
  senses: {
    passives: {
      perception: 11,
      insight: 11,
      investigation: 11,
    },
    darkvision: {
      bright: 0,
      dim: 0,
    },
  },
  saves: {
    strength: 0,
    dexterity: 2,
    constitution: 1,
    intelligence: 5,
    wisdom: 4,
    charisma: -1,
  },
  skills: [
    {
      name: "Acrobatics",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Animal Handling",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Arcana",
      mod: 5,
      proficient: true,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Athletics",
      mod: 0,
      proficient: false,
      expert: false,
      ability: "strength",
    },
    {
      name: "Deception",
      mod: -1,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "History",
      mod: 5,
      proficient: true,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Insight",
      mod: 4,
      proficient: true,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Intimidation",
      mod: -1,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Investigation",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Medicine",
      mod: 4,
      proficient: true,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Nature",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Perception",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Performance",
      mod: -1,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Persuasion",
      mod: -1,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Religion",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Sleight of Hand",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Stealth",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Survival",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "wisdom",
    },
  ],
  attacksPerAction: 1,
  attacks: [],
  inventory: {
    currency: {
      cp: 0,
      sp: 0,
      gp: 0,
      pp: 0,
    },
    backpack: [
      {
        item: weapons.quarterstaff,
        category: "weapon",
        quantity: 1,
        equipped: true,
      },
      {
        item: magicItems.ringOfMindShielding,
        category: "magic item",
        quantity: 1,
        equipped: true,
      },
    ],
    stored: [],
    maxAttunedItems: 3,
    attunedMagicItems: [magicItems.ringOfMindShielding],
  },
  resources: {
    kiPoints: { max: 0, current: 0 },
    bardicInspirations: { max: 0, current: 0 },
    wildShapes: { max: 0, current: 0 },
    superiorityDie: { max: 0, current: 0 },
    arcaneRecoveries: { max: 0, current: 0 },
    layOnHands: { max: 0, current: 0 },
    channelDivinity: { max: 0, current: 0 },
    evasions: { max: 0, current: 0 },
  },
  notes: [
    {
      id: "062087be-22d8-4c4a-8eba-ebdf92352e4b",
      name: "Note 1",
      contents:
        "This is a note about something I need to keep track of in the game",
    },
    {
      id: "b5771ee6-9285-4672-b52c-7f088796e0b5",
      name: "Another note",
      contents:
        "This note has different contents about something else I don't remember",
    },
    {
      id: "564c57b8-21ed-43ea-abc4-919ac0fc8642",
      name: "Important note",
      contents:
        "Well on the morning of session 3 we went to a tavern and found nothing there but Durnan.",
    },
    {
      id: "fd517252-7f1b-4034-9fbe-5c8a8fe0dd12",
      name: "Dwayne",
      contents:
        "We must find Dwayne with haste, he has gone missing and Mhazhique is distraught",
    },
    {
      id: "6e7ec250-8673-421b-802d-04260fce1066",
      name: "Red hoods",
      contents:
        "Who are the red hoods and why do they want me? I have to find them and ask.",
    },
    {
      id: "2f675ce4-d29e-436d-9546-2b63ca78a32d",
      name: "Barryman",
      contents:
        "Met a dude called Barryman who owned a local tannery, maybe in future if we get any skins we can use him before selling them.",
    },
  ],
};

export default characterSheet;
