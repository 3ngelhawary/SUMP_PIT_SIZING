export function rectangularGeometry(planArea, fixedLength, fixedWidth, aspectRatio) {
  const warnings = [];
  let length = null;
  let width = null;

  if (fixedLength && fixedWidth) {
    length = fixedLength;
    width = fixedWidth;
    const areaActual = length * width;
    if (areaActual < planArea) warnings.push("Fixed rectangular dimensions provide less area than required.");
    if (areaActual > planArea * 1.5) warnings.push("Fixed rectangular dimensions are much larger than the minimum area.");
  } else if (fixedLength && !fixedWidth) {
    length = fixedLength;
    width = planArea / length;
  } else if (!fixedLength && fixedWidth) {
    width = fixedWidth;
    length = planArea / width;
  } else {
    width = Math.sqrt(planArea / aspectRatio);
    length = width * aspectRatio;
  }

  if (length < 1 || width < 1) warnings.push("One or more rectangular dimensions are very small.");
  if (length > 20 || width > 20) warnings.push("One or more rectangular dimensions are very large.");
  return { length, width, warnings };
}

export function circularGeometry(planArea) {
  const warnings = [];
  const diameter = Math.sqrt((4 * planArea) / Math.PI);
  if (diameter < 1) warnings.push("Circular diameter is very small.");
  if (diameter > 15) warnings.push("Circular diameter is very large.");
  return { diameter, warnings };
}
