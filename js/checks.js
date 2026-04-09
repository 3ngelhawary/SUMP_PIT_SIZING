export function practicalWarnings(input, result) {
  const warnings = [];

  if (result.planArea < 1) warnings.push("Calculated plan area is very small. Review constructability and maintenance access.");
  if (result.planArea > 100) warnings.push("Calculated plan area is very large. Confirm pumping strategy and starts/hr limit.");
  if (result.totalDepth < 1.2) warnings.push("Total depth is very small for a typical pump station.");
  if (result.totalDepth > 10) warnings.push("Total depth is very large. Review civil and maintenance constraints.");
  if (input.dutyPumps > 1) warnings.push("Multiple duty pumps are included in the total pumping rate used for drawdown.");
  if (input.safetyFactor > 25) warnings.push("Safety factor is high. Confirm whether such conservatism is intended.");

  return warnings;
}
