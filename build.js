import * as esbuild from 'esbuild';
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

// IIFE bundle — sets window.PToolsCore
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  globalName: 'PToolsCore',
  format: 'iife',
  target: 'es2022',
  outfile: 'dist/ptools-core.min.js',
});

// ESM bundle — for import
await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  target: 'es2022',
  outfile: 'dist/ptools-core.esm.min.js',
});

// Generate SRI hashes
const iifeContent = readFileSync('dist/ptools-core.min.js');
const esmContent = readFileSync('dist/ptools-core.esm.min.js');

const iifeHash = createHash('sha384').update(iifeContent).digest('base64');
const esmHash = createHash('sha384').update(esmContent).digest('base64');

const integrity = {
  'ptools-core.min.js': `sha384-${iifeHash}`,
  'ptools-core.esm.min.js': `sha384-${esmHash}`,
};

writeFileSync('dist/integrity.json', JSON.stringify(integrity, null, 2));

console.log('Build complete:');
console.log(`  ptools-core.min.js     (${iifeContent.length} bytes) — ${integrity['ptools-core.min.js']}`);
console.log(`  ptools-core.esm.min.js (${esmContent.length} bytes) — ${integrity['ptools-core.esm.min.js']}`);
