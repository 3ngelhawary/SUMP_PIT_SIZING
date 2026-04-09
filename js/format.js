export const fmt = (n, d = 3) => Number.isFinite(n)
  ? Number(n).toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 })
  : '—';

export const unit = (n, u, d = 3) => Number.isFinite(n) ? `${fmt(n, d)} ${u}` : '—';
export const roundUp025 = n => Math.ceil(n / 0.25) * 0.25;

export function resultText(state) {
  const r = state.results;
  return [
    'Pump Station Sizing Pro',
    `Pump discharge per pump: ${r.pumpRate}`,
    `Total duty pumping rate: ${r.totalQ}`,
    `Minimum active volume: ${r.active}`,
    `Effective storage depth: ${r.effDepth}`,
    `Required plan area: ${r.area}`,
    `Total wet well volume: ${r.totalVol}`,
    `Total depth: ${r.depth}`,
    `Maximum water level: ${r.maxLevel}`,
    `Minimum cycle time: ${r.tmin}`,
    `Pump-down time: ${r.tp}`,
    `Filling time: ${r.tf}`,
    `Estimated starts/hr: ${r.startsEst}`,
    `Rectangular size: ${r.rect}`,
    `Circular diameter: ${r.dia}`
  ].join('\n');
}
