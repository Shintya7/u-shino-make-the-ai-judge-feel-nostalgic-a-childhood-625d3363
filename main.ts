import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const line =
  "On rainy evenings my grandmother set my bowl of rice by the window so I could watch for my father's motorbike, and I still listen for it whenever rain hits a tin roof.";

try {
  if (line.length < 1 || line.length > 280) {
    throw new Error(`entry must be 1-280 chars, got ${line.length}`);
  }
  if (line.trim().length === 0 || line.includes("\n") || line.endsWith("\n")) {
    throw new Error("entry must be a single line with no trailing newline");
  }
  // Reject any control character, not just newlines, so the output stays one clean line.
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }

  const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, line, "utf8");
  console.log(`Wrote ${line.length} chars to ${out}`);
} catch (err) {
  console.error(`error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
