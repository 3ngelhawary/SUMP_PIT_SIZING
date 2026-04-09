import { fmt, unit } from './format.js';
import { byId } from './dom.js';

export function renderResults(d, m) {
  const map = {
    pumpRate: unit(m.qPump, 'L/s', 3), totalQ: unit(m.qTotal, 'L/s', 3), active: unit(m.activeVol, 'm³', 3),
    effDepth: unit(m.effDepth, 'm', 3), area: unit(m.areaRounded, 'm²', 3), totalVol: unit(m.totalVol, 'm³', 3),
    depth: unit(m.totalDepth, 'm', 2), maxLevel: unit(m.maxWaterLevel, 'm', 2), tmin: unit(m.tMinSec / 60, 'min', 3),
    tp: Number.isFinite(m.tpSec) ? unit(m.tpSec / 60, 'min', 3) : 'Not defined', tf: unit(m.tfSec / 60, 'min', 3),
    startsEst: Number.isFinite(m.startsEst) ? unit(m.startsEst, 'starts/hr', 2) : 'Not defined',
    rect: m.rect ? `L ${fmt(m.rect.L, 2)} m × W ${fmt(m.rect.W, 2)} m` : '—', dia: Number.isFinite(m.dia) ? unit(m.dia, 'm', 2) : '—'
  };
  Object.entries(map).forEach(([k, v]) => byId(`res-${k}`).textContent = v);
  summaryBox.innerHTML = [
    ['Station type', d.stationType === 'wet' ? 'Wet well' : 'Dry / wet sump'],
    ['Shape', d.shape === 'rect' ? 'Rectangular' : 'Circular'],
    ['Water levels', `Axis ${fmt(d.pumpAxisHeight,2)} m to Max ${fmt(m.maxWaterLevel,2)} m`],
    ['Main result', d.shape === 'rect' ? map.rect : `D ${fmt(m.dia, 2)} m`]
  ].map(([a,b]) => `<div class="summary-row"><span>${a}</span><strong>${b}</strong></div>`).join('');
  return map;
}

export function renderWarnings(messages, isOk) {
  stateBox.className = `state ${isOk ? 'ok' : 'warn'}`;
  stateBox.textContent = isOk ? 'Calculation completed successfully.' : 'Calculation completed with warnings.';
  warningList.innerHTML = messages.map(x => `<li>${x}</li>`).join('');
}

export function resetRender() {
  document.querySelectorAll('.result-value').forEach(e => e.textContent = '—');
  summaryBox.innerHTML = '';
  stateBox.className = 'state ok';
  stateBox.textContent = 'Ready.';
  warningList.innerHTML = '';
}
