import { getRef, state } from "./state.js";
export function buildFormulas() {
  state.formulas = [
    {
      title: "Minimum cycle time",
      text: "Tmin = 3600 / starts per hour. This is the target time between successive starts."
    },
    {
      title: "Minimum active storage",
      text: "Vmin = Tmin × Qduty / 4. Here Qduty is the total pumping rate of duty pumps only."
    },
    {
      title: "Pump-down time check",
      text: "tp = V / (Qduty − Qin). This check is only valid when total duty pump flow exceeds incoming flow."
    },
    {
      title: "Plan area",
      text: "A = Vactive / Deffective. Total depth = dead storage + effective depth + freeboard."
    },
    {
      title: "Geometry",
      text: "Rectangular: L × W = A. Circular: D = sqrt(4A / pi)."
    }
  ];
}
export function renderFormulas() {
  getRef("formulaHost").innerHTML = state.formulas.map(item => `
    <article class="formula-card"><h4>${item.title}</h4><p>${item.text}</p></article>
  `).join("");
}
