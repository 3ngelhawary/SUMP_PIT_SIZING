import { getRef, state } from "./state.js";
export function showStatus(ok, validationWarnings, calcWarnings, extraWarnings) {
  state.warnings = [...validationWarnings, ...calcWarnings, ...extraWarnings];
  const box = getRef("statusBox");
  const list = getRef("warningList");
  list.innerHTML = "";
  if (!ok) {
    box.className = "status status--warn";
    box.textContent = "Calculation stopped. Review highlighted inputs.";
    return;
  }
  if (state.warnings.length === 0) {
    box.className = "status status--ok";
    box.textContent = "Calculation completed with no major warnings.";
    return;
  }
  box.className = "status status--warn";
  box.textContent = "Calculation completed with warnings / assumptions to review.";
  state.warnings.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}
export function wireLiveClear() {
  document.querySelectorAll("input").forEach(node => {
    node.addEventListener("input", () => {
      document.querySelectorAll(".error").forEach(err => err.textContent = "");
    });
  });
}
