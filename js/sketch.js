export function drawSketch(d, m) {
  drawSection(d, m);
  drawTop(d, m);
}

function drawSection(d, m) {
  const svg = sectionSketch;
  const wall = 22, x = 180, outerW = 250, innerW = outerW - wall * 2;
  const yBase = 330, scale = 235 / Math.max(m.totalDepth, 0.1), outerH = m.totalDepth * scale, yTop = yBase - outerH;
  const innerX = x + wall, innerY = yTop + wall, innerH = outerH - wall * 2;
  const crownY = yBase - m.crownLevel * scale, invertY = yBase - d.invertLevel * scale;
  const maxY = yBase - m.maxWaterLevel * scale, axisY = yBase - d.pumpAxisHeight * scale;
  const isRect = d.shape === 'rect';
  const outer = isRect
    ? `<rect class="sk-wall" x="${x}" y="${yTop}" width="${outerW}" height="${outerH}" rx="10"/>`
    : `<ellipse class="sk-wall" cx="${x+outerW/2}" cy="${yTop+18}" rx="${outerW/2}" ry="18"/><rect class="sk-wall" x="${x}" y="${yTop+18}" width="${outerW}" height="${outerH-36}"/><ellipse class="sk-wall" cx="${x+outerW/2}" cy="${yBase-18}" rx="${outerW/2}" ry="18"/>`;
  const inner = isRect
    ? `<rect class="sk-inner" x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}" rx="8"/>`
    : `<ellipse class="sk-inner" cx="${x+outerW/2}" cy="${innerY+14}" rx="${innerW/2}" ry="14"/><rect class="sk-inner" x="${innerX}" y="${innerY+14}" width="${innerW}" height="${innerH-28}"/><ellipse class="sk-inner" cx="${x+outerW/2}" cy="${yBase-wall-14}" rx="${innerW/2}" ry="14"/>`;
  svg.innerHTML = `
    <rect width="680" height="380" fill="#0d1521"/>
    ${outer}
    ${inner}
    <rect class="sk-water" x="${innerX}" y="${maxY}" width="${innerW}" height="${axisY-maxY}"/>
    <rect class="sk-dead" x="${innerX}" y="${axisY}" width="${innerW}" height="${yBase-wall-axisY}"/>
    <rect class="sk-pipe" x="${x-80}" y="${crownY}" width="${innerX-(x-80)}" height="${m.pipeDiaM*scale}" rx="4"/>
    <line class="sk-line" x1="${x+outerW+40}" y1="${yTop}" x2="${x+outerW+40}" y2="${yBase}"/>
    <line class="sk-line" x1="${x+outerW+28}" y1="${yTop}" x2="${x+outerW+52}" y2="${yTop}"/>
    <line class="sk-line" x1="${x+outerW+28}" y1="${yBase}" x2="${x+outerW+52}" y2="${yBase}"/>
    <line class="sk-line sk-soft" x1="${innerX-10}" y1="${maxY}" x2="${x+outerW+20}" y2="${maxY}"/>
    <line class="sk-line sk-soft" x1="${innerX-10}" y1="${axisY}" x2="${x+outerW+20}" y2="${axisY}"/>
    <line class="sk-line sk-soft" x1="${x-95}" y1="${invertY}" x2="${x+20}" y2="${invertY}"/>
    <line class="sk-line sk-soft" x1="${x-95}" y1="${crownY}" x2="${x+20}" y2="${crownY}"/>
    <line class="sk-line sk-soft" x1="${x-20}" y1="${yTop+10}" x2="${x+outerW+20}" y2="${yTop+10}"/>
  `;
}

function drawTop(d, m) {
  const svg = topSketch;
  const wall = 14;
  const body = d.shape === 'rect'
    ? `<rect class="sk-wall" x="180" y="60" width="310" height="140" rx="14"/><rect class="sk-inner" x="${180+wall}" y="${60+wall}" width="${310-wall*2}" height="${140-wall*2}" rx="10"/><rect class="sk-pipe" x="120" y="114" width="74" height="24" rx="4"/><line class="sk-line" x1="180" y1="224" x2="490" y2="224"/><line class="sk-line" x1="525" y1="60" x2="525" y2="200"/>`
    : `<circle class="sk-wall" cx="335" cy="128" r="94"/><circle class="sk-inner" cx="335" cy="128" r="${94-wall}"/><rect class="sk-pipe" x="118" y="116" width="86" height="24" rx="4"/><line class="sk-line" x1="241" y1="236" x2="429" y2="236"/>`;
  svg.innerHTML = `<rect width="680" height="280" fill="#0d1521"/>${body}`;
}
