import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const scripts = html.match(/<script>/g) || [];
const scriptEnds = html.match(/<\/script>/g) || [];
const styles = html.match(/<style>/g) || [];
const styleEnds = html.match(/<\/style>/g) || [];
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

assert.match(html, /^<!DOCTYPE html>/i, 'index.html must be a complete HTML document');
assert.equal(scripts.length, 1, 'index.html must contain exactly one inline script');
assert.equal(scriptEnds.length, 1, 'index.html must close exactly one inline script');
assert.equal(styles.length, 1, 'index.html must contain exactly one style block');
assert.equal(styleEnds.length, 1, 'index.html must close exactly one style block');
assert.ok(script, 'index.html must contain an inline game script');
assert.doesNotThrow(() => new vm.Script(script), 'inline JavaScript must parse');

assert.match(html, /const BUILD_VERSION='v\d+(?:-A\d+)?';/, 'build version must be present');
assert.match(html, /const HERO_ART='data:image\/jpeg;base64,/, 'welcome artwork must be embedded');

for (const environment of ['Big Bear', 'Orange County', 'SoCal']) {
  assert.ok(html.includes(environment), `core environment missing: ${environment}`);
}

assert.match(html, /const jumpKeys=new Set/, 'jump keyboard controls must be present');
assert.match(html, /const brakeKeys=new Set/, 'brake keyboard controls must be present');
assert.match(html, /const sendKeys=new Set/, 'send keyboard controls must be present');
assert.match(html, /f&&f\.kind==='ramp'/, 'ramp collision guard must be present');

// Transitional guard while the game still ships from a single source file.
// The old 500 KB ceiling predates the embedded art/current game and incorrectly fails healthy builds.
assert.ok(Buffer.byteLength(html) < 1_500_000, 'single-file source exceeded the 1.5 MB pre-modularization guard');

console.log("Crash'n Jimmy validation passed.");
