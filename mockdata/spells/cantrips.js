const acidSplash = {
  name: "Acid Splash",
  castingTime: "1 action",
  range: "60ft",
  verbal: true,
  somatic: true,
  material: false,
  materials: [],
  duration: "Instantaneous",
  description:
    "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
  level: 0,
};

const light = {
  name: "Light",
  castingTime: "1 action",
  range: "Touch",
  verbal: true,
  somatic: false,
  material: true,
  materials: ["a firefly or phosphorescent moss"],
  duration: "1 hour",
  description:
    "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action. If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
  level: 0,
};

const thunderclap = {
  name: "Thunderclap",
  castingTime: "1 action",
  range: "Self (5-foot radius)",
  verbal: false,
  somatic: true,
  material: false,
  materials: [],
  duration: "Instantaneous",
  description:
    "You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.",
  level: 0,
};

export default { acidSplash, light, thunderclap };
