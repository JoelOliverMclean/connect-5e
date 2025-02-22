function getModifier(mod) {
  return (mod < 0 ? "" : "+") + mod;
}

function getModifierFromStat(stat) {
  var mod = Math.floor(parseFloat((stat - 10) / 2));
  return getModifier(mod);
}

export { getModifier, getModifierFromStat };
