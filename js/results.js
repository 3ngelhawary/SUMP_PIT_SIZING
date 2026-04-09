import { getRef, state } from "./state.js";
import { n, u, textBlock, lineItem, minutes } from "./format.js";
export function buildResultState(data, calc, rect, circ) {
  state.outputs = [
    textBlock("Effective storage volume", u(calc.activeVolume, "m³"), "Usable storage between ON and OFF levels."),
    textBlock("Total wet well volume", u(calc.totalVolume, "m³"), "Includes dead storage and freeboard."),
    textBlock("Required plan area", u(calc.planArea, "m²"), "Minimum plan area from active volume and depth."),
    textBlock("Total duty pump flow", u(data.pumpLs * data.dutyPumps, "L/s", 2), "Pump flow per pump × duty pumps."),
    textBlock("Minimum cycle time", u(minutes(calc.tMinSec), "min"), "From 60 / starts per hour."),
    textBlock("Estimated fill time", Number.isFinite(calc.fillSec) ? u(minutes(calc.fillSec), "min") : "—", "Filling from OFF to ON."),
    textBlock("Estimated pump-down time", Number.isFinite(calc.pumpDownSec) ? u(minutes(calc.pumpDownSec), "min") : "Infinity", "t = V / (Qduty − Qin)."),
    textBlock("Estimated actual starts/hr", Number.isFinite(calc.startsActual) ? u(calc.startsActual, "starts/hr", 2) : "0 starts/hr", "Based on dynamic cycle if valid.")
  ];
  state.geometry = [
    textBlock("Rectangular length", rect ? u(rect.length, "m") : "—", "Rectangular option only."),
    textBlock("Rectangular width", rect ? u(rect.width, "m") : "—", "Rectangular option only."),
    textBlock("Circular diameter", circ ? u(circ.diameter, "m") : "—", "Circular option only."),
    textBlock("Total depth", u(calc.totalDepth, "m"), "Dead storage + effective depth + freeboard.")
  ];
  state.summary = [
    lineItem("Station type", data.mode === "wetWell" ? "Wet well (submersible pumps)" : "Dry/wet sump (dry pumps)"),
    lineItem("Shape", data.shape === "rectangular" ? "Rectangular chamber" : "Circular chamber"),
    lineItem("Sizing basis", `Vmin = Tmin × Qduty / 4 = ${n(calc.activeBase, 3)} m³ before safety factor`),
    lineItem("Dynamic check", calc.netDown > 0 ? `Qduty − Qin = ${n(calc.netDown * 1000, 2)} L/s` : "No positive drawdown margin")
  ];
}
export function renderCards(refName, items) {
  const host = getRef(refName);
  host.innerHTML = items.map(item => `
    <div class="result-card">
      <div class="result-card__label">${item.title}</div>
      <div class="result-card__value">${item.value}</div>
      <div class="result-card__sub">${item.sub}</div>
    </div>
  `).join("");
}
export function renderSummary() {
  getRef("summaryHost").innerHTML = state.summary.map(item => `
    <div class="summary-item"><span>${item.label}</span><strong>${item.value}</strong></div>
  `).join("");
}
