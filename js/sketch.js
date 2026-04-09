window.Sketch = {
  renderSection(d, r) {
    const svg = DOM.sectionSketch;
    const W = 520, H = 400;
    const left = 120, innerW = d.shape === 'circular' ? 170 : 190;
    const depthScale = 250 / Math.max(0.1, r.totalDepthRounded);
    const tankH = r.totalDepthRounded * depthScale;
    const yBottom = 340;
    const yTop = yBottom - tankH;
    const wall = 14;

    const safeMaxWater = Math.max(d.axis, d.maxWater);
    const yAxis = yBottom - d.axis * depthScale;
    const yWater = yBottom - (safeMaxWater - d.axis) * depthScale;
    const yInvert = yBottom - (d.invert - d.axis) * depthScale;
    const pipeH = Math.max(8, d.pipeDiaM * depthScale);
    const waterY = Math.min(yBottom, Math.max(yTop + 8, yWater));
    const waterH = Math.max(0, yBottom - waterY);

    let shell = '';
    if (d.shape === 'circular') {
      shell = `
        <ellipse cx="${left + innerW/2}" cy="${yTop + 16}" rx="${innerW/2 + wall}" ry="18" fill="#607086"/>
        <rect x="${left-wall}" y="${yTop + 16}" width="${innerW + wall*2}" height="${tankH - 32}" fill="#607086"/>
        <ellipse cx="${left + innerW/2}" cy="${yBottom - 16}" rx="${innerW/2 + wall}" ry="18" fill="#607086"/>
        <ellipse cx="${left + innerW/2}" cy="${yTop + 16}" rx="${innerW/2}" ry="11" fill="#0e1825"/>
        <rect x="${left}" y="${yTop + 16}" width="${innerW}" height="${tankH - 32}" fill="#0e1825"/>
        <ellipse cx="${left + innerW/2}" cy="${yBottom - 16}" rx="${innerW/2}" ry="11" fill="#0e1825"/>
      `;
    } else {
      shell = `
        <rect x="${left-wall}" y="${yTop}" width="${innerW + wall*2}" height="${tankH}" rx="10" fill="#607086"/>
        <rect x="${left}" y="${yTop + wall}" width="${innerW}" height="${tankH - wall}" rx="6" fill="#0e1825"/>
      `;
    }

    svg.innerHTML = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="#0b1119"/>
      ${shell}
      <rect x="${left}" y="${waterY}" width="${innerW}" height="${waterH}" fill="#3c8dff" opacity=".9"/>
      <rect x="18" y="${yInvert - pipeH/2}" width="${left + 12}" height="${pipeH}" rx="6" fill="#7f8ea3"/>
      <circle cx="${left + 18}" cy="${yAxis}" r="8" fill="#93a7bf"/>
      <line x1="${left + innerW + 55}" y1="${yTop}" x2="${left + innerW + 55}" y2="${yBottom}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 45}" y1="${yTop}" x2="${left + innerW + 65}" y2="${yTop}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 45}" y1="${yBottom}" x2="${left + innerW + 65}" y2="${yBottom}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 10}" y1="${yInvert}" x2="${left + innerW + 95}" y2="${yInvert}" stroke="#8fb4df" stroke-width="2" stroke-dasharray="6 5"/>
      <line x1="${left + innerW + 10}" y1="${waterY}" x2="${left + innerW + 95}" y2="${waterY}" stroke="#7fd5ff" stroke-width="2" stroke-dasharray="6 5"/>
      <line x1="${left + innerW + 10}" y1="${yAxis}" x2="${left + innerW + 95}" y2="${yAxis}" stroke="#c3ccd7" stroke-width="2" stroke-dasharray="6 5"/>

      <text x="18" y="26" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Total depth = ${fmt(r.totalDepthRounded)} m</text>
      <text x="18" y="48" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Wall thickness = ${fmt(APP_CONFIG.wallThickness)} m</text>
      <text x="18" y="70" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Invert = ${fmt(d.invert)} m</text>
      <text x="18" y="92" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Pipe dia = ${fmt(d.pipeDiaM)} m</text>
      <text x="18" y="114" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Max water = ${fmt(d.maxWater)} m</text>
      <text x="18" y="136" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Pump axis = ${fmt(d.axis)} m</text>
    `;
  },

  renderPlan(d, r) {
    const svg = DOM.planSketch;
    const W = 520, H = 320;
    const cx = 260, cy = 165;
    svg.innerHTML = `<rect x="0" y="0" width="${W}" height="${H}" fill="#0b1119"/>`;

    if (d.shape === 'circular') {
      const outerR = 90;
      const innerR = 74;
      svg.innerHTML += `
        <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="#607086"/>
        <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="#0e1825"/>
        <rect x="${cx - 120}" y="${cy - 8}" width="70" height="16" rx="8" fill="#7f8ea3"/>
        <line x1="${cx - innerR}" y1="${cy + 118}" x2="${cx + innerR}" y2="${cy + 118}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${cx - innerR}" y1="${cy + 108}" x2="${cx - innerR}" y2="${cy + 128}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${cx + innerR}" y1="${cy + 108}" x2="${cx + innerR}" y2="${cy + 128}" stroke="#c8d6e8" stroke-width="2"/>
        <text x="22" y="28" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Diameter = ${fmt(r.dia)} m</text>
      `;
    } else {
      const outerX = 150, outerY = 70, outerW = 220, outerH = 150;
      const innerX = 166, innerY = 86, innerW = 188, innerH = 118;
      svg.innerHTML += `
        <rect x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}" rx="12" fill="#607086"/>
        <rect x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" rx="8" fill="#0e1825"/>
        <rect x="${innerX - 75}" y="${cy - 8}" width="62" height="16" rx="8" fill="#7f8ea3"/>
        <line x1="${innerX}" y1="${innerY - 26}" x2="${innerX + innerW}" y2="${innerY - 26}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${innerX}" y1="${innerY - 36}" x2="${innerX}" y2="${innerY - 16}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${innerX + innerW}" y1="${innerY - 36}" x2="${innerX + innerW}" y2="${innerY - 16}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${innerX + innerW + 26}" y1="${innerY}" x2="${innerX + innerW + 26}" y2="${innerY + innerH}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${innerX + innerW + 16}" y1="${innerY}" x2="${innerX + innerW + 36}" y2="${innerY}" stroke="#c8d6e8" stroke-width="2"/>
        <line x1="${innerX + innerW + 16}" y1="${innerY + innerH}" x2="${innerX + innerW + 36}" y2="${innerY + innerH}" stroke="#c8d6e8" stroke-width="2"/>
        <text x="22" y="28" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Length = ${fmt(r.rectL)} m</text>
        <text x="22" y="50" fill="#9ed2ff" font-size="14" font-family="Segoe UI">Width = ${fmt(r.rectW)} m</text>
      `;
    }
  },

  render(d, r) {
    this.renderSection(d, r);
    this.renderPlan(d, r);
  }
};
