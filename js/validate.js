import { setError } from "./collect.js";
export function validate(data) {
  const warnings = [];
  let ok = true;
  const intCheck = (name, value) => Number.isInteger(value) && value >= 1;
  if (!(data.inflowLs > 0)) { setError("inflowLs", "Enter a positive inflow rate."); ok = false; }
  if (!(data.pumpLs > 0)) { setError("pumpLs", "Enter a positive pump discharge rate."); ok = false; }
  if (!intCheck("installedPumps", data.installedPumps)) { setError("installedPumps", "Enter an integer of 1 or more."); ok = false; }
  if (!intCheck("dutyPumps", data.dutyPumps)) { setError("dutyPumps", "Enter an integer of 1 or more."); ok = false; }
  if (data.dutyPumps > data.installedPumps) { setError("dutyPumps", "Duty pumps cannot exceed installed pumps."); ok = false; }
  if (!(data.startsPerHour > 0)) { setError("startsPerHour", "Enter a positive starts/hour value."); ok = false; }
  if (!(data.effectiveDepth > 0)) { setError("effectiveDepth", "Effective depth must be greater than zero."); ok = false; }
  if (!(data.deadDepth >= 0)) { setError("deadDepth", "Dead storage depth cannot be negative."); ok = false; }
  if (!(data.freeboardDepth >= 0)) { setError("freeboardDepth", "Freeboard cannot be negative."); ok = false; }
  if (!(data.safetyFactor >= 0)) { setError("safetyFactor", "Safety factor cannot be negative."); ok = false; }
  if (data.shape === "rectangular" && !(data.aspectRatio > 0)) { setError("aspectRatio", "Aspect ratio must be greater than zero."); ok = false; }
  if (data.fixedLength !== null && !(data.fixedLength > 0)) { setError("fixedLength", "Fixed length must be greater than zero."); ok = false; }
  if (data.fixedWidth !== null && !(data.fixedWidth > 0)) { setError("fixedWidth", "Fixed width must be greater than zero."); ok = false; }
  const totalDutyFlow = data.pumpLs * data.dutyPumps;
  if (data.startsPerHour > 15) warnings.push("Starts per hour is relatively high; confirm against selected pump/control limits.");
  if (data.startsPerHour < 1) warnings.push("Starts per hour is very low and may force a very large wet well.");
  if (totalDutyFlow < data.inflowLs) warnings.push("Total duty pump flow is below inflow, so the sump cannot draw down during pumping.");
  if (totalDutyFlow === data.inflowLs) warnings.push("Total duty pump flow equals inflow; active storage can fill, but pump-down time tends to infinity.");
  return { ok, warnings };
}
