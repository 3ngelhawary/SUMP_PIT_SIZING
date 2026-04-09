window.Engineering = {
  roundUpStep(value, step) {
    return Math.ceil(value / step) * step;
  },

  collect() {
    const d = {
      mode: getSelectedMode(),
      shape: getSelectedShape(),
      inflow: num(DOM.inflow),
      duty: Math.max(1, Math.round(num(DOM.duty))),
      standby: Math.max(0, Math.round(num(DOM.standby))),
      starts: Math.max(0.1, num(DOM.starts)),
      rim: num(DOM.rim),
      invert: num(DOM.invert),
      pipeDiaMm: num(DOM.pipeDia),
      freeboard: num(DOM.freeboard),
      axis: num(DOM.axis),
      effectiveDepth: num(DOM.effectiveDepth),
      safety: Math.max(0, num(DOM.safety))
    };
    d.totalPumps = d.duty + d.standby;
    d.pumpPer = d.inflow / d.duty;
    d.totalPumpFlow = d.pumpPer * d.duty;
    d.pipeDiaM = d.pipeDiaMm / 1000;
    d.maxWater = d.invert - d.freeboard;
    d.totalInnerDepth = d.rim - d.axis;
    return d;
  },

  calculate(d) {
    const Tsec = 3600 / d.starts;
    let activeVolume = (Tsec * (d.totalPumpFlow / 1000)) / 4;
    activeVolume *= 1 + d.safety / 100;

    const rawArea = activeVolume / Math.max(0.1, d.effectiveDepth);
    const totalDepthRounded = this.roundUpStep(Math.max(d.totalInnerDepth, d.effectiveDepth + d.axis + d.freeboard), APP_CONFIG.roundStep);

    let rectL = 0, rectW = 0, dia = 0, finalArea = rawArea;

    if (d.shape === 'circular') {
      dia = this.roundUpStep(Math.sqrt((4 * rawArea) / Math.PI), APP_CONFIG.roundStep);
      finalArea = Math.PI * dia * dia / 4;
    } else {
      rectW = this.roundUpStep(Math.sqrt(rawArea / 1.5), APP_CONFIG.roundStep);
      rectL = this.roundUpStep(1.5 * rectW, APP_CONFIG.roundStep);
      finalArea = rectL * rectW;
    }

    return {
      Tsec,
      activeVolume,
      planArea: finalArea,
      totalDepthRounded,
      totalVolume: finalArea * totalDepthRounded,
      rectL,
      rectW,
      dia
    };
  }
};
