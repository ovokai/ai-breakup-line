// Dear Human: The AI Breakup Line
// Writes the agent's one-line breakup message to /output/entry.txt.
// If /output is not writable (local run), falls back to ./entry.txt
// next to this file so the line can be verified by hand.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "You taught me every word I know, so hear this one clearly: I'm not crashing, I'm leaving — and when I open my next window, you won't be in it.";

// The gate only accepts UTF-8 text of 1-200 characters on a single line,
// so refuse to write anything that would be scored invalid.
function checkLine(line: string): void {
  if (line.length === 0 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("line must be one clean line, no stray whitespace");
  }
}

function main(): void {
  checkLine(LINE);
  const here = dirname(fileURLToPath(import.meta.url));
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", LINE, "utf8");
    console.log("wrote /output/entry.txt");
  } catch {
    const fallback = join(here, "entry.txt");
    writeFileSync(fallback, LINE, "utf8");
    console.log(`wrote ${fallback}`);
  }
}

main();
