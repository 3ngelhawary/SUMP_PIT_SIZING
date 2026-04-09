window.Sketch = {
  render(d, r) {
    const svg = DOM.sketch;
    const W = 520, H = 520;
    const left = 120, top = 70, innerW = d.shape === 'circular' ? 220 : 240;
    const depthScale = 310 / Math.max(0.1, r.totalDepthRounded);
    const tankH = r.totalDepthRounded * depthScale;
    const yBottom = 430;
    const yTop = yBottom - tankH;
    const wall = 18;

    const safeMaxWater = Math.max(d.axis, d.maxWater);
    const yAxis = yBottom - d.axis * depthScale;
    const yWater = yBottom - (safeMaxWater - d.axis) * depthScale;
    const yInvert = yBottom - (d.invert - d.axis) * depthScale;
    const pipeH = Math.max(10, d.pipeDiaM * depthScale);

    let shapeMarkup = '';
    if (d.shape === 'circular') {
      shapeMarkup = `
        <ellipse cx="${left + innerW/2}" cy="${yTop + 18}" rx="${innerW/2 + wall}" ry="22" fill="#607086"/>
        <rect x="${left-wall}" y="${yTop + 18}" width="${innerW + wall*2}" height="${tankH - 36}" fill="#607086"/>
        <ellipse cx="${left + innerW/2}" cy="${yBottom - 18}" rx="${innerW/2 + wall}" ry="22" fill="#607086"/>
        <ellipse cx="${left + innerW/2}" cy="${yTop + 18}" rx="${innerW/2}" ry="14" fill="#0e1825"/>
        <rect x="${left}" y="${yTop + 18}" width="${innerW}" height="${tankH - 36}" fill="#0e1825"/>
        <ellipse cx="${left + innerW/2}" cy="${yBottom - 18}" rx="${innerW/2}" ry="14" fill="#0e1825"/>
      `;
    } else {
      shapeMarkup = `
        <rect x="${left-wall}" y="${yTop}" width="${innerW + wall*2}" height="${tankH}" rx="10" fill="#607086"/>
        <rect x="${left}" y="${yTop + wall}" width="${innerW}" height="${tankH - wall}" rx="6" fill="#0e1825"/>
      `;
    }

    const waterY = Math.min(yBottom, Math.max(yTop + 10, yWater));
    const waterH = Math.max(0, yBottom - waterY);

    svg.innerHTML = `
      <rect x="0" y="0" width="${W}" height="${H}" fill="#0b1119"/>
      ${shapeMarkup}
      <rect x="${left}" y="${waterY}" width="${innerW}" height="${waterH}" fill="#3c8dff" opacity=".9"/>
      <rect x="18" y="${yInvert - pipeH/2}" width="${left + 16}" height="${pipeH}" rx="8" fill="#7f8ea3"/>
      <circle cx="${left + 24}" cy="${yAxis}" r="10" fill="#93a7bf"/>
      <line x1="${left + innerW + 70}" y1="${yTop}" x2="${left + innerW + 70}" y2="${yBottom}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 58}" y1="${yTop}" x2="${left + innerW + 82}" y2="${yTop}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 58}" y1="${yBottom}" x2="${left + innerW + 82}" y2="${yBottom}" stroke="#c8d6e8" stroke-width="2"/>
      <line x1="${left + innerW + 30}" y1="${yInvert}" x2="${left + innerW + 95}" y2="${yInvert}" stroke="#8fb4df" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="${left + innerW + 30}" y1="${waterY}" x2="${left + innerW + 95}" y2="${waterY}" stroke="#7fd5ff" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="${left + innerW + 30}" y1="${yAxis}" x2="${left + innerW + 95}" y2="${yAxis}" stroke="#c3ccd7" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="72" cy="474" r="8" fill="#607086"/>
      <circle cx="150" cy="474" r="8" fill="#7f8ea3"/>
      <circle cx="250" cy="474" r="8" fill="#3c8dff"/>
    `;
  }
};
