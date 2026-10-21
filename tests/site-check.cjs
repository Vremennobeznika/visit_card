'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const read = file => fs.readFileSync(file, 'utf8');

const html = read('index.html');
const css = read('style.css');
const js = read('script.js');
const required = [
  'https://vremennobeznika.github.io/evosif/',
  'https://vremennobeznika.github.io/enjigirling/',
  'https://t.me/enjigirling',
  'https://t.me/evosif',
  'mailto:eva.tselikina@ya.ru'
];
for (const url of required) {
  assert.ok(html.includes('href="' + url + '"'), 'Отсутствует обязательная ссылка: ' + url);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Повторяющийся id');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(match[1]), 'Не найдена якорная цель #' + match[1]);
}
for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert.match(match[0], /\brel="[^"]*noopener[^"]*"/, 'Безопасность target=_blank');
}
for (const asset of ['style.css', 'script.js', 'favicon.svg']) {
  assert.ok(fs.existsSync(asset), 'Нет локального файла ' + asset);
  assert.ok(html.includes('"' + asset + '"'), 'Файл не подключён: ' + asset);
}
assert.match(html, /<html lang="ru" class="theme-dark">/);
assert.match(html, /<meta name="viewport"/);
assert.match(html, /<main id="content">/);
assert.match(css, /@media\(max-width:560px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(js, /localStorage\.setItem\(key/);
assert.match(js, /aria-pressed/);
console.log('Визитка: статические проверки пройдены.');
