import { roundUp025 } from './format.js';

function calcRect(area, d) {
  let L, W;
  if (d.fixedLength && d.fixedWidth) L = d.fixedLength, W = d.fixedWidth;
  else if (d.fixedLength) L = d.fixedLength, W = area / L;
  else if (d.fixedWidth) W = d.fixedWidth, L = area / W;
  else W = Math.sqrt(area / d.aspect), L = d.aspect * W;
  return { L: roundUp025(L), W: roundUp025(W) };
}

export function calculateModel(d) {
  const warnings = [];
  const qPump = d.pumpRate, qTotal = qPump * d.dutyPumps;
  const tMinSec = 3600 / d.starts;
  let activeVol = (tMinSec * (qTotal / 1000)) / 4;
  activeVol *= 1 + d.safety / 100;
  const rawArea = activeVol / d.effDepth;
  const totalDepthRounded = roundUp025(d.deadDepth + d.effDepth + d.freeboard);
  let tpSec = NaN, tfSec = activeVol / (d.inflow / 1000), areaRounded = rawArea;
  if (qTotal > d.inflow) tpSec = activeVol / ((qTotal - d.inflow) / 1000);
  else if (qTotal === d.inflow) warnings.push('Total duty pumping rate equals inflow. No drawdown margin.');
  else warnings.push('Total duty pumping rate is less than inflow. Drawdown cannot occur.');
  let rect = null, dia = NaN;
  if (d.shape === 'rect') rect = calcRect(rawArea, d), areaRounded = rect.L * rect.W;
  else dia = roundUp025(Math.sqrt((4 * rawArea) / Math.PI)), areaRounded = Math.PI * dia * dia / 4;
  const totalVol = areaRounded * totalDepthRounded;
  const startsEst = Number.isFinite(tpSec) ? 3600 / (tpSec + tfSec) : NaN;
  if (d.stationType === 'drywet') warnings.push('Dry/wet sump affects equipment arrangement, not wet-side storage basis.');
  return { qPump, qTotal, activeVol, rawArea, areaRounded, totalDepthRounded, totalVol, tMinSec, tpSec, tfSec, startsEst, rect, dia, warnings };
}
