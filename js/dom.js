window.DOM = {
  inflow: document.getElementById('inflow'),
  duty: document.getElementById('duty'),
  standby: document.getElementById('standby'),
  totalPumps: document.getElementById('totalPumps'),
  pumpPer: document.getElementById('pumpPer'),
  starts: document.getElementById('starts'),
  rim: document.getElementById('rim'),
  invert: document.getElementById('invert'),
  pipeDia: document.getElementById('pipeDia'),
  freeboard: document.getElementById('freeboard'),
  axis: document.getElementById('axis'),
  effectiveDepth: document.getElementById('effectiveDepth'),
  safety: document.getElementById('safety'),
  activeModeText: document.getElementById('activeModeText'),
  outVolume: document.getElementById('outVolume'),
  outArea: document.getElementById('outArea'),
  outDepth: document.getElementById('outDepth'),
  outTotalVol: document.getElementById('outTotalVol'),
  outCycle: document.getElementById('outCycle'),
  outDiameter: document.getElementById('outDiameter'),
  outLength: document.getElementById('outLength'),
  outWidth: document.getElementById('outWidth'),
  sketch: document.getElementById('sketch'),
  calcBtn: document.getElementById('calcBtn'),
  exampleBtn: document.getElementById('exampleBtn'),
  resetBtn: document.getElementById('resetBtn')
};

window.getSelectedMode = () => document.querySelector('input[name="mode"]:checked').value;
window.getSelectedShape = () => document.querySelector('input[name="shape"]:checked').value;
window.num = (el) => Number(el.value || 0);
window.fmt = (n, d = 2) => Number(n).toLocaleString(undefined, {maximumFractionDigits:d, minimumFractionDigits:0});
