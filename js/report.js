import { unit } from "./utils.js";

export function buildSnapshot(input, result) {
  return {
    shape: input.shape,
    effectiveVolume: unit(result.effectiveVolume, "m³"),
    totalVolume: unit(result.totalVolume, "m³"),
    planArea: unit(result.planArea, "m²"),
    totalPumpRate: unit(result.totalPumpRateLs, "L/s", 2),
    cycleTime: unit(result.cycleTime / 60, "min"),
    starts: unit(result.starts, "starts/hr", 2),
    fillTime: unit(result.fillTime / 60, "min"),
    runTime: unit(result.runTime / 60, "min"),
    length: result.length ? unit(result.length, "m") : "—",
    width: result.width ? unit(result.width, "m") : "—",
    diameter: result.diameter ? unit(result.diameter, "m") : "—",
    totalDepth: unit(result.totalDepth, "m")
  };
}

export function reportText(snapshot) {
  return [
    "Wastewater Pump Station / Sump Pit Sizing",
    "=========================================",
    `Shape: ${snapshot.shape}`,
    `Effective storage volume: ${snapshot.effectiveVolume}`,
    `Total wet well volume: ${snapshot.totalVolume}`,
    `Required plan area: ${snapshot.planArea}`,
    `Total pumping rate: ${snapshot.totalPumpRate}`,
    `Estimated cycle time: ${snapshot.cycleTime}`,
    `Estimated starts per hour: ${snapshot.starts}`,
    `Estimated filling time: ${snapshot.fillTime}`,
    `Estimated running time: ${snapshot.runTime}`,
    `Rectangular length: ${snapshot.length}`,
    `Rectangular width: ${snapshot.width}`,
    `Circular diameter: ${snapshot.diameter}`,
    `Total depth: ${snapshot.totalDepth}`,
    "",
    "For preliminary sizing only. Final design must be checked by a qualified engineer."
  ].join("\n");
}
