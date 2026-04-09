import { buildDom } from './dom.js';
import { setValues, autoPumpRate } from './collect.js';
import { wireEvents } from './events.js';
import { example } from './config.js';
import { calculateModel } from './engineering.js';
import { renderResults, renderWarnings } from './render.js';
import { drawSketch } from './sketch.js';

const state = { results: {}, model: null };

buildDom();
setValues(example);
autoPumpRate();
wireEvents(state);

const data = {
  ...example,
  pumpRate: Number((example.inflow / example.dutyPumps).toFixed(3))
};
const model = calculateModel(data);
state.results = renderResults(data, model);
state.model = model;
drawSketch(data, model);
renderWarnings(model.warnings, model.warnings.length === 0);
