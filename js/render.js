import { ASSUMPTIONS } from "./config.js";
import { dom } from "./dom.js";
import { fmt, text, unit } from "./utils.js";

export function renderAssumptions() {
  dom.assumptionList.innerHTML = ASSUMPTIONS.map(item => `<li>${item}</li>`).join("");
}

export function renderStatus(mode, message) {
  dom.statusBox.className = `status status--${mode}`;
  dom.statusBox.textContent = message;
}

export function renderWarnings(items) {
  dom.warningList.innerHTML = items.map(item => `<li>${item}</li>`).join("");
}

export function renderResults(input, result) {
  text("kpi-effectiveVolume", unit(result.effectiveVolume, "m³"));
  text("kpi-totalVolume", unit(result.totalVolume, "m³"));
  text("kpi-planArea", unit(result.planArea, "m²"));
  text("kpi-totalPumpRate", unit(result.totalPumpRateLs, "L/s", 2));
  text("kpi-cycleTime", unit(result.cycleTime / 60, "min"));
  text("kpi-starts", unit(result.starts, "starts/hr", 2));
  text("kpi-fillTime", unit(result.fillTime / 60, "min"));
  text("kpi-runTime", unit(result.runTime / 60, "min"));
  text("kpi-length", result.length ? unit(result.length, "m") : "—");
  text("kpi-width", result.width ? unit(result.width, "m") : "—");
  text("kpi-diameter", result.diameter ? unit(result.diameter, "m") : "—");
  text("kpi-totalDepth", unit(result.totalDepth, "m"));

  const primary = input.shape === "rectangular"
    ? `L ${fmt(result.length)} m × W ${fmt(result.width)} m`
    : `D ${fmt(result.diameter)} m`;

  dom.summaryPanel.innerHTML = `
    <div class="summary__row"><span class="summary__label">Shape</span><span class="summary__value">${input.shape}</span></div>
    <div class="summary__row"><span class="summary__label">Primary geometry</span><span class="summary__value">${primary}</span></div>
    <div class="summary__row"><span class="summary__label">Net usable storage</span><span class="summary__value">${fmt(result.effectiveVolume)} m³</span></div>
    <div class="summary__row"><span class="summary__label">Cycle time</span><span class="summary__value">${fmt(result.cycleTime / 60)} min</span></div>
    <div class="summary__row"><span class="summary__label">Total depth</span><span class="summary__value">${fmt(result.totalDepth)} m</span></div>
  `;
}
