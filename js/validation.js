import { clearErrors, err } from "./utils.js";

export function validate(data) {
  clearErrors();
  const warnings = [];
  let valid = true;

  if (!(data.inflowRate > 0)) { err("inflowRate", "Enter a positive inflow rate."); valid = false; }
  if (!(data.pumpRate > 0)) { err("pumpRate", "Enter a positive discharge rate."); valid = false; }
  if (!(Number.isInteger(data.numPumps) && data.numPumps >= 1)) { err("numPumps", "Use an integer >= 1."); valid = false; }
  if (!(Number.isInteger(data.dutyPumps) && data.dutyPumps >= 1)) { err("dutyPumps", "Use an integer >= 1."); valid = false; }
  if (data.dutyPumps > data.numPumps) { err("dutyPumps", "Duty pumps cannot exceed installed pumps."); valid = false; }
  if (!(data.startsPerHour > 0)) { err("startsPerHour", "Enter a positive starts/hr value."); valid = false; }
  if (!(data.effectiveDepth > 0)) { err("effectiveDepth", "Effective depth must be > 0."); valid = false; }
  if (!(data.deadDepth >= 0)) { err("deadDepth", "Dead depth cannot be negative."); valid = false; }
  if (!(data.freeboardDepth >= 0)) { err("freeboardDepth", "Freeboard depth cannot be negative."); valid = false; }
  if (!(data.safetyFactor >= 0)) { err("safetyFactor", "Safety factor cannot be negative."); valid = false; }

  if (data.shape === "rectangular") {
    if (!(data.aspectRatio > 0)) { err("aspectRatio", "Aspect ratio must be positive."); valid = false; }
    if (data.fixedLength !== null && !(data.fixedLength > 0)) { err("fixedLength", "Fixed length must be > 0."); valid = false; }
    if (data.fixedWidth !== null && !(data.fixedWidth > 0)) { err("fixedWidth", "Fixed width must be > 0."); valid = false; }
  }

  if (data.startsPerHour > 20) warnings.push("Starts per hour is very high. Confirm motor/control limits.");
  if (data.startsPerHour < 1) warnings.push("Starts per hour is very low. Wet well may become oversized.");
  if (data.effectiveDepth < 0.5) warnings.push("Effective depth is shallow. Verify level spacing and pump submergence.");

  const totalPumpRate = data.pumpRate * data.dutyPumps;
  if (valid && totalPumpRate <= data.inflowRate) {
    err("pumpRate", "Total duty pumping rate must exceed inflow.");
    warnings.push("Incoming flow is too high relative to duty pump flow for drawdown.");
    valid = false;
  }

  return { valid, warnings };
}
