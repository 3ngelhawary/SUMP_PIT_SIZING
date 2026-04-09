import { buildInputs, buildKpis, buildShapePanel } from "./dom.js";
import { emptyResults } from "./utils.js";
import { readInputs, loadExample, resetInputs } from "./input.js";
import { validate } from "./validation.js";
import { calculateHydraulics } from "./hydraulics.js";
import { calculateVolumes } from "./volume.js";
import { circularGeometry, rectangularGeometry } from "./geometry.js";
import { practicalWarnings } from "./checks.js";
import { renderAssumptions, renderResults, renderStatus, renderWarnings } from "./render.js";
import { buildSnapshot, reportText } from "./report.js";
import { bindEvents, copyText } from "./events.js";

let snapshot = null;

function clearView(message = "Ready.") {
  emptyResults();
  document.getElementById("summaryPanel").innerHTML = `
    <div class="summary__row"><span class="summary__label">Shape</span><span class="summary__value">—</span></div>
    <div class="summary__row"><span class="summary__label">Primary geometry</span><span class="summary__value">—</span></div>
    <div class="summary__row"><span class="summary__label">Net usable storage</span><span class="summary__value">—</span></div>
    <div class="summary__row"><span class="summary__label">Cycle time</span><span class="summary__value">—</span></div>
    <div class="summary__row"><span class="summary__label">Total depth</span><span class="summary__value">—</span></div>
  `;
  renderWarnings([]);
  renderStatus("ok", message);
}

function calculate() {
  const input = readInputs();
  const check = validate(input);

  if (!check.valid) {
    clearView("Calculation stopped. Review highlighted inputs.");
    renderWarnings(check.warnings);
    renderStatus("error", "Calculation stopped. Review highlighted inputs.");
    return;
  }

  const hydraulic = calculateHydraulics(input);
  const volumes = calculateVolumes(input, hydraulic.effectiveVolume);
  const geometry = input.shape === "rectangular"
    ? rectangularGeometry(volumes.planArea, input.fixedLength, input.fixedWidth, input.aspectRatio)
    : circularGeometry(volumes.planArea);

  const result = {
    ...hydraulic,
    ...volumes,
    length: geometry.length ?? null,
    width: geometry.width ?? null,
    diameter: geometry.diameter ?? null
  };

  const warnings = [
    ...check.warnings,
    ...geometry.warnings,
    ...practicalWarnings(input, result)
  ];

  renderResults(input, result);
  renderWarnings(warnings);
  renderStatus(warnings.length ? "warn" : "ok", warnings.length ? "Calculation complete with warnings." : "Calculation complete with no major warnings.");
  snapshot = buildSnapshot(input, result);
}

function init() {
  buildInputs();
  buildShapePanel();
  buildKpis();
  renderAssumptions();
  loadExample();
  clearView("Default example loaded. Ready.");
  calculate();

  bindEvents({
    calculate,
    example: () => { loadExample(); calculate(); },
    reset: () => { resetInputs(); clearView("Form reset. Enter data or load the example."); },
    copy: async () => {
      if (!snapshot) return;
      try {
        await copyText(reportText(snapshot));
        renderStatus("ok", "Results copied to clipboard.");
      } catch {
        renderStatus("error", "Copy failed. Try again.");
      }
    },
    print: () => window.print(),
    shapeChange: () => calculate(),
    live: () => {}
  });
}

init();
