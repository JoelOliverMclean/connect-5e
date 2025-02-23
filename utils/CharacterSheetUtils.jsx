function getModifier(mod) {
  return (mod < 0 ? "" : "+") + mod;
}

function getModifierFromStat(stat) {
  return getModifier(getModifierIntFromStat(stat));
}

function getModifierIntFromStat(stat) {
  return Math.floor(parseFloat((stat - 10) / 2));
}

export { getModifier, getModifierFromStat, getModifierIntFromStat };
