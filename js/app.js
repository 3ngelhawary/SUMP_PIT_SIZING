import { defaults, state } from "./state.js";
import { renderInputs, renderConfig, captureRefs, qs } from "./dom.js";
import { collectInputs, clearErrors, setValues } from "./collect.js";
import { validate } from "./validate.js";
import { compute, rectangular, circular } from "./engineering.js";
import { buildResultState, renderCards, renderSummary } from "./results.js";
import { buildFormulas, renderFormulas } from "./formulas.js";
import { showStatus, wireLiveClear } from "./status.js";
import { copyResults, printResults } from "./copyprint.js";
function runCalculation() {
  clearErrors();
  const data = collectInputs();
  const check = validate(data);
  if (!check.ok) {
    showStatus(false, check.warnings, [], []);
    return;
  }
  const calc = compute(data);
  const rect = data.shape === "rectangular"
    ? rectangular(calc.planArea, data.fixedLength, data.fixedWidth, data.aspectRatio)
    : null;
  const circ = data.shape === "circular" ? circular(calc.planArea) : null;
  buildResultState(data, calc, rect, circ);
  renderCards("resultsGrid", state.outputs);
  renderCards("geometryGrid", state.geometry);
  renderSummary();
  showStatus(true, check.warnings, calc.warnings, rect ? rect.warnings : []);
}
function loadExample() {
  setValues(defaults);
  runCalculation();
}
function resetForm() {
  document.querySelectorAll('input[type="number"]').forEach(node => node.value = "");
  document.querySelector('input[name="mode"][value="wetWell"]').checked = true;
  document.querySelector('input[name="shape"][value="rectangular"]').checked = true;
  qs("statusBox").textContent = "Form reset. Enter inputs or load example.";
}
function bootstrap() {
  renderInputs();
  renderConfig();
  captureRefs();
  buildFormulas();
  renderFormulas();
  wireLiveClear();
  qs("calculateBtn").addEventListener("click", runCalculation);
  qs("exampleBtn").addEventListener("click", loadExample);
  qs("resetBtn").addEventListener("click", resetForm);
  qs("copyBtn").addEventListener("click", e => copyResults(e.currentTarget));
  qs("printBtn").addEventListener("click", printResults);
  loadExample();
}
bootstrap();
