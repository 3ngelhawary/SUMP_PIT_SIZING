export const inputDefs = [
  ['inflow','Inflow rate to wet well','L/s','Incoming flow entering the wet well.'],
  ['pumpRate','Pump discharge rate per pump','L/s','Auto = inflow / duty pumps.', true],
  ['numPumps','Number of pumps installed','No.','Total pumps physically available.'],
  ['dutyPumps','Duty pumps operating','No.','Used for auto pump-rate calculation.'],
  ['starts','Desired maximum starts per hour','starts/hr','Used for Tmin = 3600 / starts/hr.'],
  ['safety','Safety factor','%','Applied to active storage volume.'],
  ['effDepth','Effective depth ON-OFF','m','Depth between ON and OFF levels.'],
  ['deadDepth','Dead storage depth','m','Bottom clearance / dead storage.'],
  ['freeboard','Freeboard depth','m','Top freeboard allowance.']
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
  ['area','Required plan area'],
  ['totalVol','Total wet well volume'],
  ['depth','Total depth rounded'],
  ['tmin','Minimum cycle time'],
  ['tp','Pump-down time'],
  ['tf','Filling time'],
  ['startsEst','Estimated starts per hour'],
  ['rect','Rectangular size rounded'],
  ['dia','Circular diameter rounded']
];

export const example = {
  inflow: 500, numPumps: 3, dutyPumps: 2, starts: 6, safety: 10,
  effDepth: 1.5, deadDepth: 0.5, freeboard: 0.4,
  fixedLength: '', fixedWidth: '', aspect: 1.5,
  stationType: 'wet', shape: 'rect'
};
