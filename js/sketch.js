import { fmt } from './format.js';

export function drawSketch(d, m) {
  drawSection(d, m);
  drawTop(d, m);
}

function drawSection(d, m) {
  const svg = sectionSketch;
  const wall = 22, x = 180, outerW = 250, innerW = outerW - wall * 2;
  const yBase = 330, scale = 235 / Math.max(m.totalDepth, 0.1), outerH = m.totalDepth * scale, yTop = yBase - outerH;
  const innerX = x + wall, innerY = yTop + wall, innerH = outerH - wall * 2;
  const pipeY = yBase - d.invertLevel * scale - d.pipeDia * scale;
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
    <text class="sk-title" x="22" y="28">Section View</text>
    ${outer}
    ${inner}
    <rect class="sk-water" x="${innerX}" y="${maxY}" width="${innerW}" height="${axisY-maxY}"/>
    <rect class="sk-dead" x="${innerX}" y="${axisY}" width="${innerW}" height="${yBase-wall-axisY}"/>
    <rect class="sk-free" x="${innerX}" y="${pipeY + d.pipeDia * scale}" width="${innerW}" height="${maxY - (pipeY + d.pipeDia * scale)}"/>
    <rect class="sk-pipe" x="${x-80}" y="${pipeY}" width="${innerX-(x-80)}" height="${d.pipeDia*scale}" rx="4"/>
    <line class="sk-line" x1="${x+outerW+45}" y1="${yTop}" x2="${x+outerW+45}" y2="${yBase}"/>
    <text class="sk-dim" x="${x+outerW+58}" y="${(yTop+yBase)/2}">Total depth ${fmt(m.totalDepth,2)} m</text>
    <text class="sk-label" x="22" y="80">Wall thickness ${fmt(wall/100,2)} m (diagrammatic)</text>
    <text class="sk-label" x="22" y="110">Inlet invert ${fmt(d.invertLevel,2)} m</text>
    <text class="sk-label" x="22" y="140">Pipe diameter ${fmt(d.pipeDia,2)} m</text>
    <text class="sk-label" x="22" y="170">Max water ${fmt(m.maxWaterLevel,2)} m</text>
    <text class="sk-label" x="22" y="200">Pump axis ${fmt(d.pumpAxisHeight,2)} m</text>`;
}

function drawTop(d, m) {
  const svg = topSketch;
  const wall = 14;
  const body = d.shape === 'rect'
    ? `<rect class="sk-wall" x="180" y="60" width="310" height="140" rx="14"/><rect class="sk-inner" x="${180+wall}" y="${60+wall}" width="${310-wall*2}" height="${140-wall*2}" rx="10"/><rect class="sk-pipe" x="120" y="114" width="74" height="24" rx="4"/><line class="sk-line" x1="180" y1="224" x2="490" y2="224"/><text class="sk-dim" x="278" y="249">Length ${fmt(m.rect.L,2)} m</text><line class="sk-line" x1="525" y1="60" x2="525" y2="200"/><text class="sk-dim" x="540" y="135">Width ${fmt(m.rect.W,2)} m</text>`
    : `<circle class="sk-wall" cx="335" cy="128" r="94"/><circle class="sk-inner" cx="335" cy="128" r="${94-wall}"/><rect class="sk-pipe" x="118" y="116" width="86" height="24" rx="4"/><line class="sk-line" x1="241" y1="236" x2="429" y2="236"/><text class="sk-dim" x="294" y="261">Diameter ${fmt(m.dia,2)} m</text>`;
  svg.innerHTML = `<rect width="680" height="280" fill="#0d1521"/><text class="sk-title" x="22" y="28">Top View</text>${body}<text class="sk-label" x="22" y="261">Inlet pipe shown entering chamber wall</text>`;
}
