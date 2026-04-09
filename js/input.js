import { EXAMPLE } from "./config.js";
import { parseNum, setShape, shapeValue, val } from "./utils.js";

export function readInputs() {
  return {
    inflowRate: val("inflowRate"),
    pumpRate: val("pumpRate"),
    numPumps: val("numPumps"),
    dutyPumps: val("dutyPumps"),
    startsPerHour: val("startsPerHour"),
    effectiveDepth: val("effectiveDepth"),
    deadDepth: val("deadDepth"),
    freeboardDepth: val("freeboardDepth"),
    safetyFactor: val("safetyFactor") ?? 0,
    fixedLength: parseNum(document.getElementById("fixedLength").value),
    fixedWidth: parseNum(document.getElementById("fixedWidth").value),
    aspectRatio: val("aspectRatio"),
    shape: shapeValue(),
    siOnly: document.getElementById("siOnly").checked
  };
}

export function writeInputs(data) {
  Object.entries(data).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el && key !== "siOnly") el.value = value;
  });
  document.getElementById("siOnly").checked = !!data.siOnly;
  setShape(data.shape);
}

export function loadExample() {
  writeInputs(EXAMPLE);
}

export function resetInputs() {
  document.querySelectorAll("input").forEach(el => {
    if (el.type === "radio") return;
    if (el.type === "checkbox") el.checked = true;
    else el.value = "";
  });
  document.getElementById("aspectRatio").value = 1.5;
  setShape("rectangular");
}
