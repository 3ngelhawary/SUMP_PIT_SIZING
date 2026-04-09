export const FIELD_DEFS = [
  ["inflowRate", "Inflow rate to wet well", "L/s", "Incoming flow entering the wet well."],
  ["pumpRate", "Pump discharge rate per pump", "L/s", "Rated discharge for one pump only."],
  ["numPumps", "Number of pumps installed", "No.", "Total pumps physically available."],
  ["dutyPumps", "Duty pumps operating at a time", "No.", "Only these pumps define total pumping capacity."],
  ["startsPerHour", "Desired maximum starts per hour", "starts/hr", "Used to determine the target cycle time."],
  ["effectiveDepth", "Effective storage depth between ON and OFF", "m", "Usable vertical storage depth."],
  ["deadDepth", "Minimum bottom clearance / dead storage depth", "m", "Storage below OFF level."],
  ["freeboardDepth", "Freeboard depth", "m", "Allowance above ON level."],
  ["safetyFactor", "Optional safety factor", "%", "Applied to the effective storage volume."],
  ["fixedLength", "Optional fixed length", "m", "Rectangular only. Leave blank to auto-calculate."],
  ["fixedWidth", "Optional fixed width", "m", "Rectangular only. Leave blank to auto-calculate."],
  ["aspectRatio", "Economical aspect ratio L/W", "L/W", "Used when length and width are both free."]
];

export const KPI_DEFS = [
  ["effectiveVolume", "Effective storage volume", "Net usable storage between ON and OFF levels"],
  ["totalVolume", "Total wet well volume", "Includes dead storage and freeboard"],
  ["planArea", "Required plan area", "Minimum area needed based on effective depth"],
  ["totalPumpRate", "Total pumping rate", "Pump discharge rate × duty pumps"],
  ["cycleTime", "Estimated pump cycle time", "Full fill + run cycle"],
  ["starts", "Estimated starts per hour", "Calculated from the resulting cycle time"],
  ["fillTime", "Estimated filling time", "OFF to ON while pumps are off"],
  ["runTime", "Estimated running time", "ON to OFF while duty pumps are running"],
  ["length", "Rectangular length", "Shown when rectangular chamber is selected"],
  ["width", "Rectangular width", "Shown when rectangular chamber is selected"],
  ["diameter", "Circular diameter", "Shown when circular chamber is selected"],
  ["totalDepth", "Total depth", "Dead storage + effective depth + freeboard"]
];

export const EXAMPLE = {
  inflowRate: 20,
  pumpRate: 38,
  numPumps: 2,
  dutyPumps: 1,
  startsPerHour: 6,
  effectiveDepth: 1.5,
  deadDepth: 0.5,
  freeboardDepth: 0.4,
  safetyFactor: 10,
  fixedLength: "",
  fixedWidth: "",
  aspectRatio: 1.5,
  shape: "rectangular",
  siOnly: true
};

export const ASSUMPTIONS = [
  "All hydraulic calculations use duty pumps only, not all installed pumps.",
  "Incoming flow continues during both filling and pump running periods.",
  "Total pumping rate = discharge per pump × number of duty pumps.",
  "Net drawdown rate during operation = total pumping rate - inflow rate.",
  "Plan area is based on the effective depth between pump ON and OFF levels.",
  "The app is for preliminary sizing and does not replace final hydraulic design."
];
