import { autoPumpRate, getData, setValues } from './collect.js';
import { validate, clearErrors } from './checks.js';
import { calculateModel } from './engineering.js';
import { renderResults, renderWarnings, resetRender } from './render.js';
import { drawSketch } from './sketch.js';
import { resultText } from './format.js';
import { example } from './config.js';

export function wireEvents(state) {
  ['inflow', 'dutyPumps', 'standbyPumps'].forEach(id => document.getElementById(id).addEventListener('input', autoPumpRate));
  document.querySelectorAll('input[name="shape"]').forEach(r => r.addEventListener('change', () => { toggleRectPanel(); runCalc(state); }));
  document.querySelectorAll('input[name="stationType"]').forEach(r => r.addEventListener('change', () => runCalc(state)));
  calcBtn.addEventListener('click', () => runCalc(state));
  exampleBtn.addEventListener('click', () => { setValues(example); autoPumpRate(); toggleRectPanel(); runCalc(state); });
  resetBtn.addEventListener('click', () => resetAll());
  copyBtn.addEventListener('click', async () => navigator.clipboard.writeText(resultText(state)));
  printBtn.addEventListener('click', () => window.print());
}

function toggleRectPanel() {
  rectPanel.classList.toggle('hidden', document.querySelector('input[name="shape"]:checked').value !== 'rect');
}

function resetAll() {
  setValues(example);
  autoPumpRate();
  clearErrors();
  resetRender();
  toggleRectPanel();
}

function runCalc(state) {
  const data = getData();
  const v = validate(data);
  if (!v.ok) return resetRender(), renderWarnings(['Review highlighted inputs.'], false);
  const model = calculateModel(data), msgs = [...v.warnings, ...model.warnings];
  state.results = renderResults(data, model);
  state.model = model;
  drawSketch(data, model);
  renderWarnings(msgs, msgs.length === 0);
}
