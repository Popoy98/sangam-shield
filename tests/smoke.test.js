// Automated smoke test: loads index.html in jsdom and exercises the main flows.
// Run: npm install && npm test
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
const w = dom.window, d = w.document;
const ticks = n => { for (let i = 0; i < n; i++) w.tick(); };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const results = [];
function test(name, fn) {
  try { fn(); results.push([true, name]); }
  catch (e) { results.push([false, name + ' -> ' + e.message]); }
}

test('TC-01 page loads with 9 zones on the map', () => {
  assert.strictEqual(d.querySelectorAll('.z').length, 9);
});
test('TC-02 initial stats are populated', () => {
  assert.ok(parseInt(d.getElementById('s1').textContent.replace(/,/g, '')) > 0);
});
test('TC-03 surge at Bridge raises a danger alert', () => {
  click(d.querySelector('#scen button[data-s="surge"]'));
  ticks(40);
  const bad = [...d.querySelectorAll('#alist .bad')].map(x => x.textContent);
  assert.ok(bad.includes('Bridge'), 'alerts: ' + bad.join(','));
});
test('TC-04 diversion brings Bridge density down', () => {
  click(d.getElementById('z_bridge'));
  const before = parseFloat(d.getElementById('zd').textContent);
  assert.ok(before >= 4, 'bridge before diversion = ' + before);
  click(d.getElementById('tabs').querySelector('[data-t="al"]'));
  const btn = d.querySelector('#alist [data-z="bridge"]');
  assert.ok(btn, 'apply diversion button missing');
  click(btn);
  ticks(60);
  click(d.getElementById('z_bridge'));
  const after = parseFloat(d.getElementById('zd').textContent);
  assert.ok(after < 4, 'bridge after diversion = ' + after);
});
test('TC-05 safe route is returned for Main Gate to Ghat A', () => {
  d.getElementById('from').value = 'gate'; d.getElementById('to').value = 'ghatA';
  click(d.getElementById('goR'));
  const t = d.getElementById('rOut').textContent;
  assert.ok(t.includes('Safest route') && t.includes('Main Gate') && t.includes('Ghat A'), t);
  assert.ok(d.getElementById('rt').getAttribute('points').length > 0);
});
test('TC-06 SOS finds the Medical Camp', () => {
  d.getElementById('at').value = 'ghatB';
  click(d.getElementById('goS'));
  assert.ok(d.getElementById('sOut').textContent.includes('Medical Camp'));
});
test('TC-07 Hindi toggle changes the interface language', () => {
  click(d.querySelector('#lg button[data-l="1"]'));
  assert.ok(d.getElementById('tag').textContent.includes('कुंभ'));
});

w.close();
let failed = 0;
results.forEach(([ok, name]) => { console.log((ok ? 'PASS ' : 'FAIL ') + name); if (!ok) failed++; });
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
