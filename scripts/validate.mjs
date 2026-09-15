import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

assert.match(html, /^<!DOCTYPE html>/i, 'index.html must be a complete HTML document');
assert.ok(script, 'index.html must contain an inline game script');
assert.doesNotThrow(() => new vm.Script(script), 'inline JavaScript must parse');
assert.match(html, /const BUILD_VERSION='v\d+';/, 'build version must be present');
assert.match(html, /const HERO_ART='data:image\/jpeg;base64,/, 'welcome artwork must be embedded');
assert.match(html, /const jumpKeys=new Set/, 'jump keyboard controls must be present');
assert.match(html, /const brakeKeys=new Set/, 'brake keyboard controls must be present');
assert.match(html, /const sendKeys=new Set/, 'send keyboard controls must be present');
assert.match(html, /f&&f\.kind==='ramp'/, 'ramp collision guard must be present');
assert.ok(Buffer.byteLength(html) < 500_000, 'single-file build must stay below 500 KB');

console.log('Crash\'n Jimmy validation passed.');
