import { getModifierIntFromStat } from "@/utils/CharacterSheetUtils";
import fighter from "../classes/fighter";
import wizard from "../classes/wizard";
import armor from "../items/armor";
import weapons from "../items/weapons";

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
    armor: [],
    weapons: [],
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
  currency: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,
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
    spellAttackBonus: 5,
    knownSpells: [],
    preparedSpells: [],
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
    strength: 5,
    dexterity: 3,
    constitution: 3,
    intelligence: 1,
    wisdom: -1,
    charisma: 2,
  },
  skills: [
    {
      name: "Acrobatics",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Animal Handling",
      mod: -1,
      proficient: true,
      expert: true,
      ability: "wisdom",
    },
    {
      name: "Arcana",
      mod: 1,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Athletics",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "strength",
    },
    {
      name: "Deception",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "History",
      mod: 3,
      proficient: true,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Insight",
      mod: 1,
      proficient: true,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Intimidation",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Investigation",
      mod: 1,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Medicine",
      mod: -1,
      proficient: false,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Nature",
      mod: 1,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Perception",
      mod: 1,
      proficient: true,
      expert: false,
      ability: "wisdom",
    },
    {
      name: "Performance",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Persuasion",
      mod: 2,
      proficient: false,
      expert: false,
      ability: "charisma",
    },
    {
      name: "Religion",
      mod: 1,
      proficient: false,
      expert: false,
      ability: "intelligence",
    },
    {
      name: "Sleight of Hand",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Stealth",
      mod: 3,
      proficient: false,
      expert: false,
      ability: "dexterity",
    },
    {
      name: "Survival",
      mod: 1,
      proficient: true,
      expert: false,
      ability: "wisdom",
    },
  ],
  attacksPerAction: 1,
  attacks: [],
  inventory: {
    personal: [
      {
        item: weapons.swordOfOrcStrength,
        category: "weapon",
        quantity: 1,
        equipped: true,
      },
      {
        item: weapons.crossbowLight,
        category: "weapon",
        quantity: 1,
        equipped: true,
      },
    ],
    stored: [],
    attunedMagicItems: [],
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
};

export default characterSheet;
