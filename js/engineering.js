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
  const qPump = d.pumpRate;
  const qTotal = qPump * d.dutyPumps;
  const maxWaterLevel = d.invertLevel - d.freeboard;
  const effDepth = maxWaterLevel - d.pumpAxisHeight;
  const totalDepth = roundUp025(d.invertLevel + d.pipeDia);
  const tMinSec = 3600 / d.starts;
  let activeVol = (tMinSec * (qTotal / 1000)) / 4;
  activeVol *= 1 + d.safety / 100;
  const rawArea = activeVol / effDepth;
  let tpSec = NaN;
  const tfSec = activeVol / (d.inflow / 1000);
  if (qTotal > d.inflow) tpSec = activeVol / ((qTotal - d.inflow) / 1000);
  else if (qTotal === d.inflow) warnings.push('Total duty pumping rate equals inflow. No drawdown margin.');
  else warnings.push('Total duty pumping rate is less than inflow. Drawdown cannot occur.');
  let rect = null, dia = NaN, areaRounded = rawArea;
  if (d.shape === 'rect') rect = calcRect(rawArea, d), areaRounded = rect.L * rect.W;
  else dia = roundUp025(Math.sqrt((4 * rawArea) / Math.PI)), areaRounded = Math.PI * dia * dia / 4;
  const totalVol = areaRounded * totalDepth;
  const startsEst = Number.isFinite(tpSec) ? 3600 / (tpSec + tfSec) : NaN;
  if (d.stationType === 'drywet') warnings.push('Dry/wet sump affects equipment arrangement, not wet-side storage basis.');
  if (effDepth < 1) warnings.push('Effective depth is shallow. Check controls and pump submergence.');
  return { qPump, qTotal, activeVol, effDepth, rawArea, areaRounded, totalDepth, totalVol, maxWaterLevel, tMinSec, tpSec, tfSec, startsEst, rect, dia, warnings };
}
