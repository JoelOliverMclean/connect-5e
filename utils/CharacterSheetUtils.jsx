function getModifier(level) {
  var mod = Math.floor(parseFloat((level - 10) / 2));
  return (mod < 0 ? "" : "+") + mod;
}

export { getModifier };
