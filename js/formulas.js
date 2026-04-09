export function litersToM3PerSecond(ls) {
  return ls / 1000;
}

export function cycleTargetSeconds(startsPerHour) {
  return 3600 / startsPerHour;
}

/*
  Storage relation:
  A full cycle includes:
  1) Filling from OFF to ON while pumps are OFF
     t_fill = Veff / Qin

  2) Drawdown from ON to OFF while pumps are ON
     net drawdown rate = Qp_total - Qin
     t_run = Veff / (Qp_total - Qin)

  Therefore:
     T_cycle = Veff / Qin + Veff / (Qp_total - Qin)

  Rearranged:
     Veff = T_cycle / [1/Qin + 1/(Qp_total - Qin)]
*/

export function effectiveStorage(input) {
  const qIn = litersToM3PerSecond(input.inflowRate);
  const qPerPump = litersToM3PerSecond(input.pumpRate);
  const qDuty = qPerPump * input.dutyPumps;
  const qNetDown = qDuty - qIn;
  const tTarget = cycleTargetSeconds(input.startsPerHour);
  const base = tTarget / ((1 / qIn) + (1 / qNetDown));
  const effectiveVolume = base * (1 + input.safetyFactor / 100);
  return { qIn, qPerPump, qDuty, qNetDown, tTarget, effectiveVolume };
}

export function timingFromVolume(effectiveVolume, qIn, qNetDown) {
  const fillTime = effectiveVolume / qIn;
  const runTime = effectiveVolume / qNetDown;
  const cycleTime = fillTime + runTime;
  const starts = 3600 / cycleTime;
  return { fillTime, runTime, cycleTime, starts };
}
