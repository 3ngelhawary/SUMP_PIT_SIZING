export function n(value, digits = 3) {
  if (!Number.isFinite(value)) return "—";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}
export function u(value, unit, digits = 3) {
  if (!Number.isFinite(value)) return "—";
  return `${n(value, digits)} ${unit}`;
}
export function textBlock(title, value, sub) {
  return { title, value, sub };
}
export function lineItem(label, value) {
  return { label, value };
}
export function cleanNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
export function minutes(sec) {
  return sec / 60;
}
export function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
export function joinLines(lines) {
  return lines.filter(Boolean).join("
");
}
export function clamp(value, low, high) {
  return Math.min(high, Math.max(low, value));
}
export function roundUp(value, step) {
  if (!Number.isFinite(value) || !step) return value;
  return Math.ceil(value / step) * step;
}
