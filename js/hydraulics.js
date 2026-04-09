import { effectiveStorage, timingFromVolume } from "./formulas.js";

export function calculateHydraulics(input) {
  const base = effectiveStorage(input);
  const timing = timingFromVolume(base.effectiveVolume, base.qIn, base.qNetDown);
  const totalPumpRateLs = input.pumpRate * input.dutyPumps;

  return {
    qIn: base.qIn,
    qPerPump: base.qPerPump,
    qDuty: base.qDuty,
    qNetDown: base.qNetDown,
    targetCycle: base.tTarget,
    effectiveVolume: base.effectiveVolume,
    fillTime: timing.fillTime,
    runTime: timing.runTime,
    cycleTime: timing.cycleTime,
    starts: timing.starts,
    totalPumpRateLs
  };
}
