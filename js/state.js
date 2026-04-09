export const state = {
  fields: [],
  outputs: [],
  geometry: [],
  formulas: [],
  warnings: [],
  summary: [],
  refs: {}
};
export function setRef(name, value) {
  state.refs[name] = value;
}
export function getRef(name) {
  return state.refs[name];
}
export function clearArrays() {
  state.outputs = [];
  state.geometry = [];
  state.formulas = [];
  state.warnings = [];
  state.summary = [];
}
export const defaults = {
  mode: "wetWell",
  shape: "rectangular",
  inflowLs: 18,
  pumpLs: 42,
  installedPumps: 2,
  dutyPumps: 1,
  startsPerHour: 6,
  effectiveDepth: 1.5,
  deadDepth: 0.5,
  freeboardDepth: 0.4,
  safetyFactor: 10,
  fixedLength: "",
  fixedWidth: "",
  aspectRatio: 1.5
};
export const fieldMeta = [
  ["inflowLs", "Inflow rate to wet well", "L/s", "Incoming flow entering the wet well."],
  ["pumpLs", "Pump discharge rate per pump", "L/s", "Rated discharge for one pump only."],
  ["installedPumps", "Number of pumps installed", "No.", "Total pumps physically available."],
  ["dutyPumps", "Duty pumps operating at a time", "No.", "Only these pumps define total pumping capacity."],
  ["startsPerHour", "Desired maximum starts per hour", "starts/hr", "Used to calculate minimum cycle time."],
  ["effectiveDepth", "Effective storage depth", "m", "Depth between ON and OFF levels."],
  ["deadDepth", "Bottom clearance / dead storage depth", "m", "Storage below pump OFF level."],
  ["freeboardDepth", "Freeboard depth", "m", "Top allowance above ON level."],
  ["safetyFactor", "Safety factor", "%", "Applied to active storage volume."],
  ["fixedLength", "Optional fixed length", "m", "For rectangular chambers only."],
  ["fixedWidth", "Optional fixed width", "m", "For rectangular chambers only."],
  ["aspectRatio", "Economical L/W ratio", "L/W", "Used if both dimensions are not fixed."]
];
