function updateActiveMode() {
  const modeText = getSelectedMode() === 'wet' ? 'Wet Well' : 'Dry / Wet Sump';
  const shapeText = getSelectedShape() === 'circular' ? 'Circular' : 'Rectangular';
  DOM.activeModeText.textContent = modeText + ' + ' + shapeText;
}

function loadExample() {
  DOM.inflow.value = 500;
  DOM.duty.value = 1;
  DOM.standby.value = 1;
  DOM.starts.value = 6;
  DOM.rim.value = 3.20;
  DOM.invert.value = 2.60;
  DOM.pipeDia.value = 400;
  DOM.freeboard.value = 0.30;
  DOM.axis.value = 0.80;
  DOM.effectiveDepth.value = 1.50;
  DOM.safety.value = 10;
  document.querySelector('input[name="mode"][value="wet"]').checked = true;
  document.querySelector('input[name="shape"][value="circular"]').checked = true;
}

function applyOutputs(d, r) {
  DOM.totalPumps.value = d.totalPumps;
  DOM.pumpPer.value = fmt(d.pumpPer);
  DOM.outVolume.textContent = fmt(r.activeVolume) + ' m³';
  DOM.outArea.textContent = fmt(r.planArea) + ' m²';
  DOM.outDepth.textContent = fmt(r.totalDepthRounded) + ' m';
  DOM.outTotalVol.textContent = fmt(r.totalVolume) + ' m³';
  DOM.outCycle.textContent = fmt(r.Tsec / 60) + ' min';
  DOM.outDiameter.textContent = r.dia > 0 ? fmt(r.dia) + ' m' : '—';
  DOM.outLength.textContent = r.rectL > 0 ? fmt(r.rectL) + ' m' : '—';
  DOM.outWidth.textContent = r.rectW > 0 ? fmt(r.rectW) + ' m' : '—';
}

function calculateAndRender() {
  updateActiveMode();
  const d = Engineering.collect();
  const r = Engineering.calculate(d);
  applyOutputs(d, r);
  Sketch.render(d, r);
}

function resetBlank() {
  updateActiveMode();
  DOM.sketch.innerHTML = '';
}

DOM.calcBtn.addEventListener('click', calculateAndRender);
DOM.exampleBtn.addEventListener('click', () => { loadExample(); calculateAndRender(); });
DOM.resetBtn.addEventListener('click', () => { loadExample(); resetBlank(); calculateAndRender(); });
document.querySelectorAll('input[name="mode"], input[name="shape"]').forEach(el => el.addEventListener('change', calculateAndRender));
[DOM.inflow, DOM.duty, DOM.standby, DOM.starts, DOM.rim, DOM.invert, DOM.pipeDia, DOM.freeboard, DOM.axis, DOM.effectiveDepth, DOM.safety].forEach(el => el.addEventListener('input', calculateAndRender));

loadExample();
calculateAndRender();
