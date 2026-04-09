(function () {
  const $ = (id) => document.getElementById(id);
  const state = { warnings: [] };
  const defaults = {
    inflowRate: 500, pumpRate: 250, numPumps: 3, dutyPumps: 2,
    startsPerHour: 6, effectiveDepth: 1.5, deadDepth: 0.5,
    freeboardDepth: 0.4, safetyFactor: 10, aspectRatio: 1.5,
    fixedLength: '', fixedWidth: '', mode: 'wetWell', shape: 'rectangular'
  };

  function fmt(v, d){ return Number.isFinite(v) ? `${v.toLocaleString(undefined,{maximumFractionDigits:d})}` : '—'; }
  function unit(v,u,d){ return Number.isFinite(v) ? `${fmt(v,d)} ${u}` : '—'; }
  function err(id,msg){ const e=$(id); if(e) e.textContent=msg||''; }
  function clearErr(){ document.querySelectorAll('.error').forEach(x=>x.textContent=''); }

  function renderInputs(){
    $('inputsHost').innerHTML = `
      <div class="field"><div class="label-row"><label for="inflowRate">Inflow rate to wet well</label></div><div class="input-wrap"><input id="inflowRate" class="input" type="number" step="any"><span class="unit-pill">L/s</span></div><div class="help">Incoming flow entering the wet well.</div><div id="e-inflowRate" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="pumpRate">Pump discharge rate per pump</label></div><div class="input-wrap"><input id="pumpRate" class="input" type="number" step="any"><span class="unit-pill">L/s</span></div><div class="help">Rated discharge for one pump only.</div><div id="e-pumpRate" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="numPumps">Number of pumps installed</label></div><div class="input-wrap"><input id="numPumps" class="input" type="number" step="1"><span class="unit-pill">No.</span></div><div class="help">Total pumps physically available.</div><div id="e-numPumps" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="dutyPumps">Duty pumps operating at a time</label></div><div class="input-wrap"><input id="dutyPumps" class="input" type="number" step="1"><span class="unit-pill">No.</span></div><div class="help">Only these pumps define total pumping capacity.</div><div id="e-dutyPumps" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="startsPerHour">Desired maximum starts per hour</label></div><div class="input-wrap"><input id="startsPerHour" class="input" type="number" step="any"><span class="unit-pill">starts/hr</span></div><div class="help">Used to determine minimum cycle time.</div><div id="e-startsPerHour" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="effectiveDepth">Effective storage depth</label></div><div class="input-wrap"><input id="effectiveDepth" class="input" type="number" step="any"><span class="unit-pill">m</span></div><div class="help">Between pump ON and OFF levels.</div><div id="e-effectiveDepth" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="deadDepth">Bottom clearance / dead storage depth</label></div><div class="input-wrap"><input id="deadDepth" class="input" type="number" step="any"><span class="unit-pill">m</span></div><div class="help">Inactive depth below OFF level.</div><div id="e-deadDepth" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="freeboardDepth">Freeboard depth</label></div><div class="input-wrap"><input id="freeboardDepth" class="input" type="number" step="any"><span class="unit-pill">m</span></div><div class="help">Allowance above ON level.</div><div id="e-freeboardDepth" class="error"></div></div>
      <div class="field"><div class="label-row"><label for="safetyFactor">Safety factor</label></div><div class="input-wrap"><input id="safetyFactor" class="input" type="number" step="any"><span class="unit-pill">%</span></div><div class="help">Applied to active volume.</div><div id="e-safetyFactor" class="error"></div></div>`;
  }

  function renderConfig(){
    $('configHost').innerHTML = `
      <div class="toggle-row"><label class="pill"><input type="radio" name="mode" value="wetWell"> Wet well (submersible)</label><label class="pill"><input type="radio" name="mode" value="dryWet"> Dry/wet sump (dry pumps)</label></div>
      <div class="toggle-row"><label class="pill"><input type="radio" name="shape" value="rectangular"> Rectangular</label><label class="pill"><input type="radio" name="shape" value="circular"> Circular</label></div>
      <div class="fields-grid" id="shapeFields">
        <div class="field"><div class="label-row"><label for="fixedLength">Optional fixed length</label></div><div class="input-wrap"><input id="fixedLength" class="input" type="number" step="any"><span class="unit-pill">m</span></div><div class="help">Leave blank to auto-size.</div><div id="e-fixedLength" class="error"></div></div>
        <div class="field"><div class="label-row"><label for="fixedWidth">Optional fixed width</label></div><div class="input-wrap"><input id="fixedWidth" class="input" type="number" step="any"><span class="unit-pill">m</span></div><div class="help">Leave blank to auto-size.</div><div id="e-fixedWidth" class="error"></div></div>
        <div class="field"><div class="label-row"><label for="aspectRatio">Economical aspect ratio (L/W)</label></div><div class="input-wrap"><input id="aspectRatio" class="input" type="number" step="any"><span class="unit-pill">L/W</span></div><div class="help">Used only when neither side is fixed.</div><div id="e-aspectRatio" class="error"></div></div>
      </div>`;
  }

  function renderFormulas(){
    $('formulaHost').innerHTML = `
      <div class="result-card"><div class="result-title">Minimum cycle time</div><div class="result-value">T = 3600 / starts/hr</div></div>
      <div class="result-card"><div class="result-title">Minimum active volume</div><div class="result-value">V = T × Q / 4</div></div>
      <div class="result-card"><div class="result-title">Pump-down time check</div><div class="result-value">tₚ = V / (Q − Qᵢₙ)</div></div>
      <div class="result-card"><div class="result-title">Plan area</div><div class="result-value">A = V / depth</div></div>`;
  }

  function setDefaults(){
    Object.keys(defaults).forEach(k=>{ const el=$(k); if(el) el.value=defaults[k]; });
    document.querySelector(`input[name="mode"][value="${defaults.mode}"]`).checked = true;
    document.querySelector(`input[name="shape"][value="${defaults.shape}"]`).checked = true;
  }

  function read(){
    const n = (id) => { const v=$(id)?.value; return v==='' ? null : Number(v); };
    return {
      inflowRate:n('inflowRate'), pumpRate:n('pumpRate'), numPumps:n('numPumps'), dutyPumps:n('dutyPumps'),
      startsPerHour:n('startsPerHour'), effectiveDepth:n('effectiveDepth'), deadDepth:n('deadDepth'),
      freeboardDepth:n('freeboardDepth'), safetyFactor:n('safetyFactor')||0, fixedLength:n('fixedLength'),
      fixedWidth:n('fixedWidth'), aspectRatio:n('aspectRatio'), mode:document.querySelector('input[name="mode"]:checked').value,
      shape:document.querySelector('input[name="shape"]:checked').value
    };
  }

  function validate(d){
    clearErr(); const w=[]; let ok=true;
    if(!(d.inflowRate>0)){err('e-inflowRate','Enter positive inflow.');ok=false;}
    if(!(d.pumpRate>0)){err('e-pumpRate','Enter positive pump rate.');ok=false;}
    if(!(Number.isInteger(d.numPumps)&&d.numPumps>0)){err('e-numPumps','Enter integer >= 1.');ok=false;}
    if(!(Number.isInteger(d.dutyPumps)&&d.dutyPumps>0)){err('e-dutyPumps','Enter integer >= 1.');ok=false;}
    if(d.dutyPumps>d.numPumps){err('e-dutyPumps','Duty pumps cannot exceed installed pumps.');ok=false;}
    if(!(d.startsPerHour>0)){err('e-startsPerHour','Enter positive starts/hr.');ok=false;}
    if(!(d.effectiveDepth>0)){err('e-effectiveDepth','Depth must be > 0.');ok=false;}
    if(!(d.deadDepth>=0)){err('e-deadDepth','Cannot be negative.');ok=false;}
    if(!(d.freeboardDepth>=0)){err('e-freeboardDepth','Cannot be negative.');ok=false;}
    if(!(d.safetyFactor>=0)){err('e-safetyFactor','Cannot be negative.');ok=false;}
    if(d.shape==='rectangular' && !(d.aspectRatio>0)){err('e-aspectRatio','Enter aspect ratio > 0.');ok=false;}
    if(d.fixedLength!==null && !(d.fixedLength>0)){err('e-fixedLength','Must be > 0 or blank.');ok=false;}
    if(d.fixedWidth!==null && !(d.fixedWidth>0)){err('e-fixedWidth','Must be > 0 or blank.');ok=false;}
    return {ok,w};
  }

  function compute(d){
    const qIn = d.inflowRate / 1000, qPump = (d.pumpRate * d.dutyPumps) / 1000;
    const tMinSec = 3600 / d.startsPerHour;
    let vEff = (tMinSec * qPump) / 4;
    vEff *= 1 + d.safetyFactor / 100;
    const planArea = vEff / d.effectiveDepth, totalDepth = d.deadDepth + d.effectiveDepth + d.freeboardDepth;
    const totalVolume = planArea * totalDepth, estStarts = 3600 / tMinSec;
    const fillSec = qIn>0 ? vEff / qIn : NaN, diff = qPump - qIn;
    const runSec = diff>0 ? vEff / diff : NaN;
    const warnings = [];
    if (Math.abs(diff) < 1e-12) warnings.push('Total duty pump flow equals incoming flow: no drawdown margin for pump-down check.');
    if (diff < 0) warnings.push('Total duty pump flow is less than incoming flow: dynamic drawdown is not achieved.');
    if (d.startsPerHour > 12) warnings.push('Starts per hour is relatively high. Check manufacturer limits and controls.');
    if (planArea < 1) warnings.push('Plan area is very small. Review constructability and maintenance clearance.');
    return { qIn, qPump, tMinSec, vEff, planArea, totalDepth, totalVolume, estStarts, fillSec, runSec, warnings };
  }

  function geometry(d, planArea){
    if (d.shape === 'circular') return { diameter: Math.sqrt((4*planArea)/Math.PI) };
    let L=d.fixedLength, W=d.fixedWidth, warnings=[];
    if (L && W) { if (L*W < planArea) warnings.push('Fixed rectangular dimensions are smaller than required plan area.'); }
    else if (L && !W) W = planArea / L;
    else if (!L && W) L = planArea / W;
    else { W = Math.sqrt(planArea / d.aspectRatio); L = d.aspectRatio * W; }
    return { length:L, width:W, warnings };
  }

  function card(title, value, sub){ return `<div class="result-card"><div class="result-title">${title}</div><div class="result-value">${value}</div><div class="result-sub">${sub||''}</div></div>`; }
  function renderResults(d,c,g){
    $('resultsGrid').innerHTML = [
      card('Effective storage volume', unit(c.vEff,'m³',3),'Net usable storage between ON and OFF.'),
      card('Total wet well volume', unit(c.totalVolume,'m³',3),'Includes dead storage and freeboard.'),
      card('Required plan area', unit(c.planArea,'m²',3),'Based on effective storage depth.'),
      card('Total duty pumping rate', unit(d.pumpRate*d.dutyPumps,'L/s',2),'Per-pump discharge × duty pumps.'),
      card('Minimum cycle time', unit(c.tMinSec/60,'min',3),'From maximum starts per hour.'),
      card('Estimated starts per hour', unit(c.estStarts,'starts/hr',2),'Based on T = 3600 / starts/hr.'),
      card('Estimated filling time', unit(c.fillSec/60,'min',3),'Using incoming flow only.'),
      card('Estimated running time', Number.isFinite(c.runSec)?unit(c.runSec/60,'min',3):'Not achieved','Using Q − Qin when positive only.')
    ].join('');
    $('geometryGrid').innerHTML = d.shape==='circular' ? [card('Circular diameter',unit(g.diameter,'m',3),''),card('Total depth',unit(c.totalDepth,'m',3),'')].join('') : [card('Rectangular length',unit(g.length,'m',3),''),card('Rectangular width',unit(g.width,'m',3),''),card('Total depth',unit(c.totalDepth,'m',3),'')].join('');
    $('summaryHost').innerHTML = `
      <div class="summary-row"><span>System type</span><strong>${d.mode==='wetWell'?'Wet well (submersible)':'Dry/wet sump (dry pumps)'}</strong></div>
      <div class="summary-row"><span>Selected shape</span><strong>${d.shape==='rectangular'?'Rectangular':'Circular'}</strong></div>
      <div class="summary-row"><span>Primary sizing basis</span><strong>V = T × Q / 4</strong></div>
      <div class="summary-row"><span>Total depth</span><strong>${unit(c.totalDepth,'m',3)}</strong></div>`;
  }

  function renderWarnings(list){
    $('warningList').innerHTML = list.map(x=>`<li>${x}</li>`).join('');
    $('statusBox').className = list.length ? 'status status--warn' : 'status status--ok';
    $('statusBox').textContent = list.length ? 'Calculation completed with review notes.' : 'Calculation completed successfully.';
  }

  function calculate(){
    const d = read(), v = validate(d); if(!v.ok){ $('statusBox').className='status status--warn'; $('statusBox').textContent='Please correct the highlighted inputs.'; return; }
    const c = compute(d), g = geometry(d,c.planArea), warnings = [...v.w, ...c.warnings, ...(g.warnings||[])];
    renderResults(d,c,g); renderWarnings(warnings);
  }

  function copyResults(){
    const text = document.body.innerText; navigator.clipboard.writeText(text).then(()=>{$('copyBtn').textContent='Copied'; setTimeout(()=>$('copyBtn').textContent='Copy Results',1200);});
  }

  function reset(){ document.querySelectorAll('input[type="number"]').forEach(i=>i.value=''); $('resultsGrid').innerHTML=''; $('geometryGrid').innerHTML=''; $('summaryHost').innerHTML=''; $('warningList').innerHTML=''; $('statusBox').className='status status--ok'; $('statusBox').textContent='Form reset. Enter values or load example.'; }

  renderInputs(); renderConfig(); renderFormulas(); setDefaults();
  $('calculateBtn').addEventListener('click', calculate);
  $('exampleBtn').addEventListener('click', ()=>{ setDefaults(); calculate(); });
  $('resetBtn').addEventListener('click', reset);
  $('copyBtn').addEventListener('click', copyResults);
  $('printBtn').addEventListener('click', ()=>window.print());
  calculate();
})();
