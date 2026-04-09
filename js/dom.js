import { FIELD_DEFS, KPI_DEFS } from "./config.js";

export const dom = {
  inputGrid: document.getElementById("inputGrid"),
  shapePanel: document.getElementById("shapePanel"),
  kpiGrid: document.getElementById("kpiGrid"),
  summaryPanel: document.getElementById("summaryPanel"),
  warningList: document.getElementById("warningList"),
  assumptionList: document.getElementById("assumptionList"),
  statusBox: document.getElementById("statusBox"),
  calculateBtn: document.getElementById("calculateBtn"),
  exampleBtn: document.getElementById("exampleBtn"),
  resetBtn: document.getElementById("resetBtn"),
  copyBtn: document.getElementById("copyBtn"),
  printBtn: document.getElementById("printBtn")
};

export function buildInputs() {
  dom.inputGrid.innerHTML = FIELD_DEFS.map(([id, label, unit, hint]) => `
    <div class="field ${id === "aspectRatio" ? "field--full" : ""}">
      <label class="label" for="${id}">${label}</label>
      <div class="input-wrap">
        <input id="${id}" name="${id}" type="number" step="any" min="0">
        <span class="unit">${unit}</span>
      </div>
      <div class="hint">${hint}</div>
      <div class="error" id="err-${id}"></div>
    </div>
  `).join("");

  dom.inputGrid.insertAdjacentHTML("beforeend", `
    <div class="field field--full">
      <label class="label">Unit System</label>
      <div class="toggle-row">
        <label class="toggle"><input id="siOnly" type="checkbox" checked> SI only, future-ready unit structure enabled</label>
      </div>
      <div class="hint">Current release calculates in SI only.</div>
    </div>
  `);
}

export function buildShapePanel() {
  dom.shapePanel.innerHTML = `
    <div class="toggle-row">
      <label class="toggle"><input type="radio" name="shape" value="rectangular" checked> Rectangular chamber</label>
      <label class="toggle"><input type="radio" name="shape" value="circular"> Circular chamber</label>
    </div>
  `;
}

export function buildKpis() {
  dom.kpiGrid.innerHTML = KPI_DEFS.map(([id, label, sub]) => `
    <article class="kpi">
      <div class="kpi__label">${label}</div>
      <div class="kpi__value" id="kpi-${id}">—</div>
      <div class="kpi__sub">${sub}</div>
    </article>
  `).join("");
}
