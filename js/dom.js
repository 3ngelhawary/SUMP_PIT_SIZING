import { fieldMeta, defaults, setRef } from "./state.js";
export function qs(id) { return document.getElementById(id); }
export function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}
export function renderInputs() {
  const host = qs("inputsHost");
  host.innerHTML = "";
  fieldMeta.forEach(([key, label, unit, help]) => {
    const wrap = el("div", "field");
    const lab = el("label", "label-row", label);
    lab.htmlFor = key;
    const inWrap = el("div", "input-wrap");
    const input = el("input", "input");
    input.id = key;
    input.type = "number";
    input.step = "any";
    input.value = defaults[key];
    const pill = el("span", "unit-pill", unit);
    const helpEl = el("div", "help", help);
    const err = el("div", "error");
    err.id = `err-${key}`;
    inWrap.append(input, pill);
    wrap.append(lab, inWrap, helpEl, err);
    host.appendChild(wrap);
  });
}
export function renderConfig() {
  const host = qs("configHost");
  host.innerHTML = `
    <div class="toggle-row">
      <label class="pill"><input type="radio" name="mode" value="wetWell" checked /> Wet well (submersible pumps)</label>
      <label class="pill"><input type="radio" name="mode" value="dryWet" /> Dry/wet sump (dry pumps)</label>
    </div>
    <div class="toggle-row">
      <label class="pill"><input type="radio" name="shape" value="rectangular" checked /> Rectangular</label>
      <label class="pill"><input type="radio" name="shape" value="circular" /> Circular</label>
    </div>
    <div class="help">Dry/wet sump uses the same wet-side storage sizing but indicates dry-installed pump arrangement.</div>
  `;
}
export function captureRefs() {
  ["calculateBtn", "exampleBtn", "resetBtn", "copyBtn", "printBtn", "warningList", "statusBox", "resultsGrid", "geometryGrid", "summaryHost", "formulaHost"].forEach(id => setRef(id, qs(id)));
}
