const fighter = {
  name: "Fighter",
  hitDice: "d10",
  subClasses: {
    echoKnight: {
      name: "Echo Knight",
      features: [
        {
          name: "Manifest Echo",
          level: 3,
          type: "bonus action",
          description:
            "You can magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you’re incapacitated.Your echo has 16 AC, 1 hit point, and immunity to all conditions. If it has to make a save, it uses your save bonus for the roll. It is the same size as you, and it occupies its space. On your turn, you can mentally command the echo to move up to 30 feet in any direction. If your echo is ever more than 30 feet away from you at the end of your turn, it is destroyed.As a bonus action, you can teleport, magically swapping places with your echo at a cost of 15 feet of your movement, regardless of the distance between the two of you.When you take the attack action on your turn, any attack you make with that action can originate from your space or the echo’s space. You make this choice for each attack.When a creature that you can see within 5 feet of your echo moves at least 5 feet away from it, you can use your reaction to make an opportunity attack against that creature as if you were in the echo’s space.",
          usage: null,
        },
        {
          name: "Unleash Incarnation",
          level: 3,
          type: "bonus action",
          description:
            "Whenever you take the Attack action, you can make one additional melee attack from the echo’s position.",
          usage: {
            max: 1,
            current: 1,
            refresh: "long rest",
          },
        },
      ],
    },
  },
  features: [
    {
      name: "Fighting Style - Protection",
      level: 1,
      type: "reaction",
      description:
        "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
      usage: null,
    },
    {
      name: "Second Wind",
      level: 1,
      type: "bonus action",
      description: "You regain 1d10+3 hp",
      usage: {
        max: 1,
        current: 1,
        refresh: "short rest",
      },
    },
    {
      name: "Action Surge",
      level: 2,
      type: "feature",
      description:
        "On your turn, you can take one additional action on top of your regular action.",
      usage: {
        max: 1,
        current: 1,
        refresh: "short rest",
      },
    },
  ],
};

export default fighter;
