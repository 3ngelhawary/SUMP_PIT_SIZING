import { byId } from './dom.js';

const val = id => byId(id).value === '' ? null : Number(byId(id).value);

export function getData() {
  return {
    dutyPumps: val('dutyPumps'), standbyPumps: val('standbyPumps'), numPumps: val('numPumps'),
    inflow: val('inflow'), pumpRate: val('pumpRate'), starts: val('starts'), safety: val('safety') ?? 0,
    pumpAxisHeight: val('pumpAxisHeight'), invertLevel: val('invertLevel'), pipeDia: val('pipeDia'), freeboard: val('freeboard'),
    fixedLength: val('fixedLength'), fixedWidth: val('fixedWidth'), aspect: val('aspect'),
    stationType: document.querySelector('input[name="stationType"]:checked').value,
    shape: document.querySelector('input[name="shape"]:checked').value
  };
}

export function setValues(data) {
  Object.entries(data).forEach(([k, v]) => {
    const el = byId(k); if (el) el.value = v;
  });
  document.querySelector(`input[name="stationType"][value="${data.stationType}"]`).checked = true;
  document.querySelector(`input[name="shape"][value="${data.shape}"]`).checked = true;
}

export function autoPumpRate() {
  const inflow = val('inflow');
  const duty = val('dutyPumps');
  const standby = val('standbyPumps');
  byId('numPumps').value = duty > 0 && standby >= 0 ? duty + standby : '';
  byId('pumpRate').value = inflow > 0 && duty > 0 ? (inflow / duty).toFixed(3) : '';
}
