import { byId } from './dom.js';

const err = (id, msg) => byId(`err-${id}`).textContent = msg;
export const clearErrors = () => document.querySelectorAll('.error').forEach(e => e.textContent = '');

export function validate(d) {
  clearErrors();
  let ok = true;
  const warnings = [];
  const pipeDiaM = d.pipeDia / 1000;
  if (!(Number.isInteger(d.dutyPumps) && d.dutyPumps >= 1)) err('dutyPumps', 'Enter integer >= 1.'), ok = false;
  if (!(Number.isInteger(d.standbyPumps) && d.standbyPumps >= 0)) err('standbyPumps', 'Enter integer >= 0.'), ok = false;
  if (!(Number.isInteger(d.numPumps) && d.numPumps >= d.dutyPumps)) err('numPumps', 'Auto total is invalid.'), ok = false;
  if (!(d.inflow > 0)) err('inflow', 'Enter positive inflow.'), ok = false;
  if (!(d.starts > 0)) err('starts', 'Enter positive starts/hr.'), ok = false;
  if (!(d.safety >= 0)) err('safety', 'Cannot be negative.'), ok = false;
  if (!(d.pumpAxisHeight >= 0)) err('pumpAxisHeight', 'Cannot be negative.'), ok = false;
  if (!(d.invertLevel > 0)) err('invertLevel', 'Enter positive invert level.'), ok = false;
  if (!(d.pipeDia > 0)) err('pipeDia', 'Enter positive pipe diameter.'), ok = false;
  if (!(d.freeboard >= 0)) err('freeboard', 'Cannot be negative.'), ok = false;
  if (!(d.rimElevation > 0)) err('rimElevation', 'Enter positive rim elevation.'), ok = false;
  const maxWater = d.invertLevel - d.freeboard;
  const effDepth = maxWater - d.pumpAxisHeight;
  const crownLevel = d.invertLevel + pipeDiaM;
  if (!(effDepth > 0)) err('invertLevel', 'Invert and freeboard must keep max water above pump axis.'), ok = false;
  if (d.rimElevation <= maxWater) err('rimElevation', 'Rim elevation must be above maximum water level.'), ok = false;
  if (d.rimElevation <= crownLevel) err('rimElevation', 'Rim elevation must be above pipe crown level.'), ok = false;
  if (d.shape === 'rect' && !(d.aspect > 0)) err('aspect', 'Aspect ratio must be > 0.'), ok = false;
  if (d.fixedLength !== null && !(d.fixedLength > 0)) err('fixedLength', 'Must be > 0.'), ok = false;
  if (d.fixedWidth !== null && !(d.fixedWidth > 0)) err('fixedWidth', 'Must be > 0.'), ok = false;
  if (d.starts > 15) warnings.push('Starts per hour is high. Check manufacturer limits.');
  if (d.freeboard < 0.2) warnings.push('Freeboard is small. Review operational surcharging risk.');
  if (d.pipeDia > 1200) warnings.push('Large inlet pipe. Confirm structural entry arrangement.');
  if ((d.rimElevation - crownLevel) < 0.15) warnings.push('Pipe crown is close to rim level. Check cover and access detail.');
  return { ok, warnings };
}
