// Bundles the API (shared code from ../src/lib included, packages left external) and writes dist/exercises.json.
import { build } from 'esbuild';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';

await build({
  entryPoints: ['src/index.ts', 'src/dev-server.ts', 'src/check-exercises.ts', 'src/check-data.ts'],
  bundle: true, platform: 'node', format: 'esm', target: 'node20', outdir: 'dist', packages: 'external', logLevel: 'warning',
  loader: { '.sql': 'text' },
});

const dir = new URL('../src/content/exercises/', import.meta.url);
const exercises = {};
for (const name of readdirSync(dir).filter(f => f.endsWith('.yaml'))) {
  for (const e of parse(readFileSync(new URL(name, dir), 'utf8')).exercises) exercises[e.id] = e;
}
mkdirSync('dist', { recursive: true });
writeFileSync('dist/exercises.json', JSON.stringify(exercises));
console.log(`Built the API with ${Object.keys(exercises).length} exercises.`);
