import * as schema from "@/migrations/schema.ts";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import { weapon } from "../schema";

dotenv.config({ path: "./.env.development" });

const seedBaseClasses = async (db) => {
  var baseClasses = await db.select().from(schema.baseClass);
  if (baseClasses.length <= 0) {
    baseClasses = [
      {
        id: uuidv4(),
        name: "Fighter",
        slug: "fighter",
        description: "",
        hitDice: "d10",
      },
      {
        id: uuidv4(),
        name: "Wizard",
        slug: "wizard",
        description: "",
        hitDice: "d6",
      },
      {
        id: uuidv4(),
        name: "Barbarian",
        slug: "barbarian",
        description: "",
        hitDice: "d12",
      },
      {
        id: uuidv4(),
        name: "Druid",
        slug: "druid",
        description: "",
        hitDice: "d8",
      },
      {
        id: uuidv4(),
        name: "Warlock",
        slug: "warlock",
        description: "",
        hitDice: "d8",
      },
    ];
    console.log("--> Seeding BaseClass table:");
    console.log(baseClasses);
    await db.insert(schema.baseClass).values(baseClasses).onConflictDoNothing();
    console.log("<-- Finished seeding BaseClass table");
  } else {
    console.log("<--> Skipping BaseClass seeding");
  }
  return baseClasses;
};

const seedSubClasses = async (db, baseClasses) => {
  var subClasses = await db.select().from(schema.subClass);
  if (subClasses.length <= 0) {
    subClasses = [
      {
        id: uuidv4(),
        name: "Echo Knight",
        slug: "echo-knight",
        minLevel: 3,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "fighter").id,
      },
      {
        id: uuidv4(),
        name: "School of Necromancy",
        slug: "necromancy",
        minLevel: 3,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "wizard").id,
      },
      {
        id: uuidv4(),
        name: "Circle of the Moon",
        slug: "moon-circle",
        minLevel: 3,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "druid").id,
      },
      {
        id: uuidv4(),
        name: "Path of Wild Magic",
        slug: "wild-magic",
        minLevel: 3,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "barbarian").id,
      },
      {
        id: uuidv4(),
        name: "The Fiend",
        slug: "the-fiend",
        minLevel: 1,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "warlock").id,
      },
      {
        id: uuidv4(),
        name: "The Hatter",
        slug: "the-hatter",
        minLevel: 3,
        description: "",
        baseClassId: baseClasses.find((bc) => bc.slug === "warlock").id,
      },
    ];
    console.log("--> Seeding SubClass table:");
    console.log(subClasses);
    await db.insert(schema.subClass).values(subClasses).onConflictDoNothing();
    console.log("<-- Finished seeding SubClass table");
  } else {
    console.log("<--> Skipping SubClass seeding");
  }
  return subClasses;
};

const seedClassFeatures = async (db, baseClasses, subClasses) => {
  var classFeatures = await db.select().from(schema.classFeature);
  if (classFeatures.length <= 0) {
    classFeatures = [
      {
        id: uuidv4(),
        name: "Fighting Style - Protection",
        level: 1,
        baseClassId: baseClasses.find((bc) => bc.slug === "fighter").id,
        subClassId: null,
        type: "reaction",
        description:
          "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
        maxUses: -1,
        refreshPeriod: null,
      },
      {
        id: uuidv4(),
        name: "Second Wind",
        level: 1,
        baseClassId: baseClasses.find((bc) => bc.slug === "fighter").id,
        subClassId: null,
        type: "bonus-action",
        description: "You regain 1d10+3 hp.",
        maxUses: 1,
        refreshPeriod: "short-rest",
      },
      {
        id: uuidv4(),
        name: "Action Surge",
        level: 2,
        baseClassId: baseClasses.find((bc) => bc.slug === "fighter").id,
        subClassId: null,
        type: "feature",
        description:
          "On your turn, you can take one additional action on top of your regular action.",
        maxUses: 1,
        refreshPeriod: "short-rest",
      },
      {
        id: uuidv4(),
        name: "Manifest Echo",
        level: 3,
        baseClassId: null,
        subClassId: subClasses.find((sc) => sc.slug === "echo-knight").id,
        type: "bonus-action",
        description:
          "You can magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you’re incapacitated.Your echo has 16 AC, 1 hit point, and immunity to all conditions. If it has to make a save, it uses your save bonus for the roll. It is the same size as you, and it occupies its space. On your turn, you can mentally command the echo to move up to 30 feet in any direction. If your echo is ever more than 30 feet away from you at the end of your turn, it is destroyed.As a bonus action, you can teleport, magically swapping places with your echo at a cost of 15 feet of your movement, regardless of the distance between the two of you.When you take the attack action on your turn, any attack you make with that action can originate from your space or the echo’s space. You make this choice for each attack.When a creature that you can see within 5 feet of your echo moves at least 5 feet away from it, you can use your reaction to make an opportunity attack against that creature as if you were in the echo’s space.",
        maxUses: -1,
        refreshPeriod: null,
      },
      {
        id: uuidv4(),
        name: "Unleash Incarnation",
        level: 3,
        baseClassId: null,
        subClassId: subClasses.find((sc) => sc.slug === "echo-knight").id,
        type: "bonus-action",
        description:
          "Whenever you take the Attack action, you can make one additional melee attack from the echo’s position.",
        maxUses: 1,
        refreshPeriod: "long-rest",
      },
      {
        id: uuidv4(),
        name: "Arcane Recovery",
        level: 1,
        baseClassId: baseClasses.find((bc) => bc.slug === "wizard").id,
        subClassId: null,
        type: "feature",
        description:
          "Once per day when you finish a short rest, you can choose expended spell slots up to 5th level to recover. The spell slots can have a combined level that is equal to or less than 2.",
        maxUses: 1,
        refreshPeriod: "short-rest",
      },
      {
        id: uuidv4(),
        name: "Necromancy Savant",
        level: 3,
        baseClassId: null,
        subClassId: subClasses.find((sc) => sc.slug === "necromancy").id,
        type: "feature",
        description:
          "The gold and time you must spend to copy a necromancy spell into your spellbook is halved.",
        maxUses: -1,
        refreshPeriod: null,
      },
      {
        id: uuidv4(),
        name: "Grim Harvest",
        level: 3,
        baseClassId: null,
        subClassId: subClasses.find((sc) => sc.slug === "necromancy").id,
        type: "feature",
        description:
          "Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hp equal to twice the spell’s level, or three times its level if the spell belongs to the School of Necromancy. You don’t gain this benefit for killing constructs or undead.",
        maxUses: -1,
        refreshPeriod: null,
      },
    ];
    console.log("--> Seeding ClassFeature table:");
    console.log(classFeatures);
    await db
      .insert(schema.classFeature)
      .values(classFeatures)
      .onConflictDoNothing();
    console.log("<-- Finished seeding ClassFeature table");
  } else {
    console.log("<--> Skipping ClassFeature seeding");
  }
  return classFeatures;
};

const seedRaces = async (db) => {
  var races = await db.select().from(schema.race);
  if (races.length <= 0) {
    races = [
      {
        id: uuidv4(),
        name: "Human",
        slug: "human",
        description: "",
      },
      {
        id: uuidv4(),
        name: "Halfling",
        slug: "halfling",
        description: "",
      },
      {
        id: uuidv4(),
        name: "Tiefling",
        slug: "tiefling",
        description: "",
      },
      {
        id: uuidv4(),
        name: "Gnome",
        slug: "gnome",
        description: "",
      },
    ];
    console.log("--> Seeding Race table:");
    console.log(races);
    await db.insert(schema.race).values(races).onConflictDoNothing();
    console.log("<-- Finished seeding Race table");
  } else {
    console.log("<--> Skipping Race seeding");
  }
  return races;
};

const seedSubRaces = async (db, races) => {
  var subRaces = await db.select().from(schema.subRace);
  if (subRaces.length <= 0) {
    subRaces = [
      {
        id: uuidv4(),
        name: "Lightfoot",
        slug: "lightfoot",
        description: "",
        raceId: races.find((bc) => bc.slug === "halfling").id,
      },
      {
        id: uuidv4(),
        name: "Rock",
        slug: "rock",
        description: "",
        raceId: races.find((bc) => bc.slug === "gnome").id,
      },
    ];
    console.log("--> Seeding SubRace table:");
    console.log(subRaces);
    await db.insert(schema.subRace).values(subRaces).onConflictDoNothing();
    console.log("<-- Finished seeding SubRace table");
  } else {
    console.log("<--> Skipping SubRace seeding");
  }
  return subRaces;
};

const seedRaceFeatures = async (db, races, subRaces) => {
  // var raceFeatures = await db.select().from(schema.raceFeature);
  // if (raceFeatures.length <= 0) {
  //   raceFeatures = [];
  //   console.log("--> Seeding RaceFeature table:");
  //   console.log(raceFeatures);
  //   await db
  //     .insert(schema.raceFeature)
  //     .values(raceFeatures)
  //     .onConflictDoNothing();
  //   console.log("<-- Finished seeding RaceFeature table");
  // } else {
  //   console.log("<--> Skipping RaceFeature seeding");
  // }
  // return raceFeatures;
};

const seedWeapons = async (db) => {
  var weapons = await db.select().from(schema.weapon);
  if (weapons.length <= 0) {
    weapons = [
      {
        name: "Sword of Orc Strength",
        description:
          "You have a +1 bonus to attack and damage rolls made with this sword due to the power of orc strength imbued within it.",
        range: "5ft",
        hitBonus: 6,
      },
      {
        name: "Crossbow, Light",
        description: "",
        range: "80/320ft",
        hitBonus: 5,
      },
      {
        name: "Quarterstaff",
        description: "",
        range: "5ft",
        hitBonus: 2,
      },
    ];
    console.log("--> Seeding Weapon table:");
    console.log(weapons);
    await db.insert(schema.weapon).values(weapons).onConflictDoNothing();
    console.log("<-- Finished seeding Weapon table");
  } else {
    console.log("<--> Skipping Weapon seeding");
  }
  return weapons;
};

const seedWeaponDamages = async (db, weapons) => {
  var weaponDamages = await db.select().from(schema.weaponDamage);
  if (weaponDamages.length <= 0) {
    weaponDamages = [
      {
        weaponId: weapons.find((w) => w.name === "Sword of Orc Strength").id,
        dice: "1d8",
        bonus: 1,
        type: "slashing",
      },
      {
        weaponId: weapons.find((w) => w.name === "Crossbow, Light").id,
        dice: "1d8",
        bonus: 0,
        type: "piercing",
      },
    ];
  }
};

const seedWeaponProperties = async (db, weapons) => {};

const seedArmor = async (db) => {};

const seedArmorProperties = async (db, armor) => {};

const seedMagicItems = async (db) => {};

const seedExhaustionLevels = async (db) => {};

const seedConditions = async (db) => {};

const seedAbilities = async (db) => {};

const seedSkills = async (db, abilities) => {};

const seedLanguages = async (db) => {};

const seedCurrency = async (db) => {};

const seedSpells = async (db) => {};

const seedMaterials = async (db) => {};

const seedSpellMaterials = async (db, seedSpells, materials) => {};

const seedBackgrounds = async (db) => {};

const seedBackgroundFeatures = async (db, backgrounds) => {};

const main = async () => {
  const DATABASE_URL = process.env.DATABASE_URL;

  const sql = neon(DATABASE_URL);

  const db = drizzle(sql, { schema });

  console.log("--> Seeding start");

  const baseClasses = await seedBaseClasses(db);
  const subClasses = await seedSubClasses(db, baseClasses);

  const classFeatures = await seedClassFeatures(db, baseClasses, subClasses);

  const races = await seedRaces(db);
  const subRaces = await seedSubRaces(db, races);

  console.log("<-- Seeding done");
};

main();
