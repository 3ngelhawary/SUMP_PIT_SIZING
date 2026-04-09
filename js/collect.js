import { cleanNumber } from "./format.js";
export function selected(name) {
  const node = document.querySelector(`input[name="${name}"]:checked`);
  return node ? node.value : "";
}
export function raw(id) {
  const node = document.getElementById(id);
  return node ? node.value : "";
}
export function collectInputs() {
  return {
    mode: selected("mode"),
    shape: selected("shape"),
    inflowLs: Number(raw("inflowLs")),
    pumpLs: Number(raw("pumpLs")),
    installedPumps: Number(raw("installedPumps")),
    dutyPumps: Number(raw("dutyPumps")),
    startsPerHour: Number(raw("startsPerHour")),
    effectiveDepth: Number(raw("effectiveDepth")),
    deadDepth: Number(raw("deadDepth")),
    freeboardDepth: Number(raw("freeboardDepth")),
    safetyFactor: Number(raw("safetyFactor") || 0),
    fixedLength: cleanNumber(raw("fixedLength")),
    fixedWidth: cleanNumber(raw("fixedWidth")),
    aspectRatio: Number(raw("aspectRatio"))
  };
}
export function clearErrors() {
  document.querySelectorAll(".error").forEach(node => node.textContent = "");
}
export function setError(id, message) {
  const node = document.getElementById(`err-${id}`);
  if (node) node.textContent = message;
}
export function setValues(data) {
  Object.entries(data).forEach(([key, value]) => {
    const node = document.getElementById(key);
    if (node) node.value = value;
  });
  const m = document.querySelector(`input[name="mode"][value="${data.mode}"]`);
  const s = document.querySelector(`input[name="shape"][value="${data.shape}"]`);
  if (m) m.checked = true;
  if (s) s.checked = true;
}
