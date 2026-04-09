export function q(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

export function parseNum(raw) {
  if (raw === "" || raw === null || raw === undefined) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function val(id) {
  return parseNum(document.getElementById(id)?.value);
}

export function shapeValue() {
  return q('input[name="shape"]:checked')?.value || "rectangular";
}

export function setShape(value) {
  const radio = q(`input[name="shape"][value="${value}"]`);
  if (radio) radio.checked = true;
}

export function fmt(n, digits = 3) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

export function unit(n, u, digits = 3) {
  if (!Number.isFinite(n)) return "—";
  return `${fmt(n, digits)} ${u}`;
}

export function text(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

export function clearErrors() {
  qa(".error").forEach(el => { el.textContent = ""; });
}

export function err(id, message) {
  const el = document.getElementById(`err-${id}`);
  if (el) el.textContent = message;
}

export function emptyResults() {
  qa(".kpi__value").forEach(el => { el.textContent = "—"; });
}
