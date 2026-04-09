export function calculateVolumes(input, effectiveVolume) {
  const planArea = effectiveVolume / input.effectiveDepth;
  const totalDepth = input.deadDepth + input.effectiveDepth + input.freeboardDepth;
  const deadVolume = planArea * input.deadDepth;
  const freeboardVolume = planArea * input.freeboardDepth;
  const totalVolume = planArea * totalDepth;

  return {
    planArea,
    totalDepth,
    deadVolume,
    freeboardVolume,
    totalVolume
  };
}
