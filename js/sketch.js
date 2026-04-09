import { fmt } from './format.js';

export function drawSketch(d, m) {
  drawSection(d, m);
  drawTop(d, m);
}

function drawSection(d, m) {
  const svg = sectionSketch;
  const x = 180, yBase = 315, w = 240, s = 210 / Math.max(m.totalDepthRounded, 0.1), yTop = yBase - m.totalDepthRounded * s;
  const yDead = yBase - d.deadDepth * s, yEff = yDead - d.effDepth * s;
  const tank = d.shape === 'rect'
    ? `<rect class="sk-tank" x="${x}" y="${yTop}" width="${w}" height="${m.totalDepthRounded * s}" rx="10"/>`
    : `<ellipse class="sk-tank" cx="${x+w/2}" cy="${yTop+16}" rx="${w/2}" ry="16"/><rect class="sk-tank" x="${x}" y="${yTop+16}" width="${w}" height="${m.totalDepthRounded*s-32}"/><ellipse class="sk-tank" cx="${x+w/2}" cy="${yBase-16}" rx="${w/2}" ry="16"/>`;
  svg.innerHTML = `
    <rect width="680" height="360" fill="#f8fbff"/>
    <text class="sk-title" x="22" y="28">Section View</text>
    ${tank}
    <rect class="sk-free" x="${x}" y="${yTop}" width="${w}" height="${d.freeboard*s}"/>
    <rect class="sk-water" x="${x}" y="${yEff}" width="${w}" height="${d.effDepth*s}"/>
    <rect class="sk-dead" x="${x}" y="${yDead}" width="${w}" height="${d.deadDepth*s}"/>
    <line class="sk-line" x1="${x+w+45}" y1="${yTop}" x2="${x+w+45}" y2="${yBase}"/>
    <text class="sk-dim" x="${x+w+58}" y="${(yTop+yBase)/2}">Total depth ${fmt(m.totalDepthRounded,2)} m</text>
    <text class="sk-label" x="22" y="88">Freeboard = ${fmt(d.freeboard,2)} m</text>
    <text class="sk-label" x="22" y="118">Effective = ${fmt(d.effDepth,2)} m</text>
    <text class="sk-label" x="22" y="148">Dead = ${fmt(d.deadDepth,2)} m</text>`;
}

function drawTop(d, m) {
  const svg = topSketch;
  const title = d.shape === 'rect' ? `L ${fmt(m.rect.L,2)} m × W ${fmt(m.rect.W,2)} m` : `D ${fmt(m.dia,2)} m`;
  const body = d.shape === 'rect'
    ? `<rect class="sk-tank" x="180" y="60" width="300" height="130" rx="12"/><line class="sk-line" x1="180" y1="215" x2="480" y2="215"/><text class="sk-dim" x="280" y="240">Length ${fmt(m.rect.L,2)} m</text><line class="sk-line" x1="515" y1="60" x2="515" y2="190"/><text class="sk-dim" x="530" y="132">Width ${fmt(m.rect.W,2)} m</text>`
    : `<circle class="sk-tank" cx="330" cy="126" r="86"/><line class="sk-line" x1="244" y1="225" x2="416" y2="225"/><text class="sk-dim" x="290" y="250">Diameter ${fmt(m.dia,2)} m</text>`;
  svg.innerHTML = `<rect width="680" height="280" fill="#f8fbff"/><text class="sk-title" x="22" y="28">Top View</text>${body}<text class="sk-label" x="22" y="262">${title}</text>`;
}
