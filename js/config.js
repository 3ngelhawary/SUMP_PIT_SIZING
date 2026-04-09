export const inputDefs = [
  ['dutyPumps','Duty pumps','No.','Default 1.'],
  ['standbyPumps','Standby pumps','No.','Default 1.'],
  ['numPumps','Total pumps installed','No.','Auto = duty + standby.', true],
  ['inflow','Inflow rate to wet well','L/s','Incoming flow entering the wet well.'],
  ['pumpRate','Pump discharge rate per pump','L/s','Auto = inflow / duty pumps.', true],
  ['starts','Desired maximum starts per hour','starts/hr','Used for Tmin = 3600 / starts/hr.'],
  ['safety','Safety factor','%','Applied to active storage volume.'],
  ['pumpAxisHeight','Pump axis height','m','Low water level. Default 0.8 m.'],
  ['invertLevel','Inlet pipe invert level','m','Measured from sump bottom.'],
  ['pipeDia','Inlet pipe diameter','m','Affects total depth.'],
  ['freeboard','Freeboard','m','Difference between invert and max water level. Default 0.3 m.']
];

export const rectDefs = [
  ['fixedLength','Optional fixed length','m','Leave blank to auto-calculate.'],
  ['fixedWidth','Optional fixed width','m','Leave blank to auto-calculate.'],
  ['aspect','Economical aspect ratio L/W','L/W','Used when both sides are free.']
];

export const resultDefs = [
  ['pumpRate','Pump discharge per pump'],
  ['totalQ','Total duty pumping rate'],
  ['active','Minimum active volume'],
  ['effDepth','Effective storage depth'],
  ['area','Required plan area'],
  ['totalVol','Total wet well volume'],
  ['depth','Total internal depth'],
  ['maxLevel','Maximum water level'],
  ['tmin','Minimum cycle time'],
  ['tp','Pump-down time'],
  ['tf','Filling time'],
  ['startsEst','Estimated starts per hour'],
  ['rect','Rectangular size'],
  ['dia','Circular diameter']
];

export const example = {
  dutyPumps: 1,
  standbyPumps: 1,
  numPumps: 2,
  inflow: 120,
  pumpRate: 120,
  starts: 6,
  safety: 10,
  pumpAxisHeight: 0.8,
  invertLevel: 2.6,
  pipeDia: 0.4,
  freeboard: 0.3,
  fixedLength: '',
  fixedWidth: '',
  aspect: 1.5,
  stationType: 'wet',
  shape: 'circ'
};
