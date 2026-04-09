import { inputDefs, rectDefs, resultDefs } from './config.js';

const makeField = ([id, label, unit, help, ro]) => `
  <div class="field">
    <label for="${id}">${label}</label>
    <div class="input-wrap">
      <input id="${id}" type="number" step="any" ${ro ? 'readonly' : ''}>
      <span class="unit">${unit}</span>
    </div>
    <div class="help">${help || ''}</div>
    <div class="error" id="err-${id}"></div>
  </div>`;

export function buildDom() {
  inputGrid.innerHTML = inputDefs.map(makeField).join('');
  rectPanel.innerHTML = rectDefs.map(makeField).join('');
  resultsGrid.innerHTML = resultDefs.map(([k, t]) => `
    <div class="result-box"><div class="result-key">${t}</div><div class="result-value" id="res-${k}">—</div></div>`).join('');
}

export function radios(name) {
  return [...document.querySelectorAll(`input[name="${name}"]`)];
}

export const byId = id => document.getElementById(id);
