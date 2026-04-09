import { qa } from "./utils.js";

export function bindEvents(handlers) {
  document.getElementById("calculateBtn").addEventListener("click", handlers.calculate);
  document.getElementById("exampleBtn").addEventListener("click", handlers.example);
  document.getElementById("resetBtn").addEventListener("click", handlers.reset);
  document.getElementById("copyBtn").addEventListener("click", handlers.copy);
  document.getElementById("printBtn").addEventListener("click", handlers.print);

  qa('input[name="shape"]').forEach(el => {
    el.addEventListener("change", handlers.shapeChange);
  });

  qa("input").forEach(el => {
    el.addEventListener("input", handlers.live);
  });
}

export async function copyText(text) {
  await navigator.clipboard.writeText(text);
}
