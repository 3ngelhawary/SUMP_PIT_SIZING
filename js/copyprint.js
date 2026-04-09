import { state } from "./state.js";
import { joinLines } from "./format.js";
export function resultText() {
  const lines = [
    "Wastewater Pump Station / Sump Pit Sizing Results",
    "===============================================",
    ...state.summary.map(item => `${item.label}: ${item.value}`),
    "",
    ...state.outputs.map(item => `${item.title}: ${item.value}`),
    ...state.geometry.map(item => `${item.title}: ${item.value}`),
    "",
    "Warnings / assumptions:"
  ];
  if (!state.warnings.length) lines.push("- No major warnings.");
  state.warnings.forEach(item => lines.push(`- ${item}`));
  lines.push("", "For preliminary sizing only. Final design must be checked by a qualified engineer.");
  return joinLines(lines);
}
export async function copyResults(button) {
  try {
    await navigator.clipboard.writeText(resultText());
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => button.textContent = old, 1200);
  } catch {
    alert("Copy failed in this browser.");
  }
}
export function printResults() {
  window.print();
}
