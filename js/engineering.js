export function compute(data) {
  const warnings = [];
  const qIn = data.inflowLs / 1000;
  const qPump = (data.pumpLs * data.dutyPumps) / 1000;
  const tMinSec = 3600 / data.startsPerHour;
  const activeBase = (tMinSec * qPump) / 4;
  const activeVolume = activeBase * (1 + data.safetyFactor / 100);
  const planArea = activeVolume / data.effectiveDepth;
  const totalDepth = data.deadDepth + data.effectiveDepth + data.freeboardDepth;
  const totalVolume = planArea * totalDepth;
  const fillSec = qIn > 0 ? activeVolume / qIn : NaN;
  const netDown = qPump - qIn;
  const pumpDownSec = netDown > 0 ? activeVolume / netDown : Infinity;
  const cycleSec = Number.isFinite(pumpDownSec) ? fillSec + pumpDownSec : Infinity;
  const startsActual = Number.isFinite(cycleSec) && cycleSec > 0 ? 3600 / cycleSec : 0;
  if (netDown <= 0) warnings.push("Dynamic drawdown check fails because Qduty − Qin is zero or negative.");
  if (planArea < 1) warnings.push("Required plan area is very small; confirm maintenance and hydraulic practicality.");
  if (planArea > 100) warnings.push("Required plan area is very large; review control settings and pumping strategy.");
  return {
    qIn,
    qPump,
    tMinSec,
    activeBase,
    activeVolume,
    planArea,
    totalDepth,
    totalVolume,
    fillSec,
    pumpDownSec,
    cycleSec,
    startsActual,
    netDown,
    warnings
  };
}
export function rectangular(planArea, length, width, aspectRatio) {
  let L = length;
  let W = width;
  const warnings = [];
  if (L && W) {
    if (L * W < planArea) warnings.push("Fixed rectangular dimensions provide less than the required plan area.");
  } else if (L && !W) {
    W = planArea / L;
  } else if (!L && W) {
    L = planArea / W;
  } else {
    W = Math.sqrt(planArea / aspectRatio);
    L = aspectRatio * W;
  }
  return { length: L, width: W, warnings };
}
export function circular(planArea) {
  return { diameter: Math.sqrt((4 * planArea) / Math.PI) };
}
