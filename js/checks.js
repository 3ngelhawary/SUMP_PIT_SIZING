import { byId } from './dom.js';

const err = (id, msg) => byId(`err-${id}`).textContent = msg;
export const clearErrors = () => document.querySelectorAll('.error').forEach(e => e.textContent = '');

export function validate(d) {
  clearErrors();
  let ok = true;
  const warnings = [];
  if (!(d.inflow > 0)) err('inflow', 'Enter positive inflow.'), ok = false;
  if (!(Number.isInteger(d.numPumps) && d.numPumps >= 1)) err('numPumps', 'Enter integer >= 1.'), ok = false;
  if (!(Number.isInteger(d.dutyPumps) && d.dutyPumps >= 1)) err('dutyPumps', 'Enter integer >= 1.'), ok = false;
  if (ok && d.dutyPumps > d.numPumps) err('dutyPumps', 'Duty pumps cannot exceed installed pumps.'), ok = false;
  if (!(d.starts > 0)) err('starts', 'Enter positive starts/hr.'), ok = false;
  if (!(d.effDepth > 0)) err('effDepth', 'Effective depth must be > 0.'), ok = false;
  if (!(d.deadDepth >= 0)) err('deadDepth', 'Cannot be negative.'), ok = false;
  if (!(d.freeboard >= 0)) err('freeboard', 'Cannot be negative.'), ok = false;
  if (!(d.safety >= 0)) err('safety', 'Cannot be negative.'), ok = false;
  if (d.shape === 'rect' && !(d.aspect > 0)) err('aspect', 'Aspect ratio must be > 0.'), ok = false;
  if (d.fixedLength !== null && !(d.fixedLength > 0)) err('fixedLength', 'Must be > 0.'), ok = false;
  if (d.fixedWidth !== null && !(d.fixedWidth > 0)) err('fixedWidth', 'Must be > 0.'), ok = false;
  if (d.starts > 15) warnings.push('Starts per hour is high. Check manufacturer limits.');
  if (d.starts < 1) warnings.push('Starts per hour is low. Storage may become large.');
  return { ok, warnings };
}
