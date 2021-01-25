'use strict'

const assert = require('assert');
const m = require('../js/main');

// RUN: node test.js ./popup-test.js

global.window = 'regular'
// uncomment for debug logging
// global.window = 'debug';

const localNg4200 = 'http://localhost:4200/local/contract/invoice/list';
const localNg8080 = 'http://localhost:8080/ted/module/contract/invoice/list';
const devNg = 'https://micamdevw.michigan.gov/tpaas/ted/module/contract/invoice/list';
const prodNg = 'https://miloginworker.michigan.gov/tpaas/ted/module/contract/invoice/list';

const dev = 'https://micamdevw.michigan.gov/tpaas/ted/electronicpayer/list';
const prod = 'https://miloginworker.michigan.gov/tpaas/ted/electronicpayer/list';

const local8080Index = 'http://localhost:8080/ted/index';
const dgIndex = 'https://miloginworkerqa.michigan.gov/tpaasdg/ted/index';


test('Current tab is not TED to local', () => {
    assert.equal(m.Main.replaceBaseUrl('https://google.com', 'local8080'), local8080Index);
});

test('Current tab is not TED to DG', () => {
    assert.equal(m.Main.replaceBaseUrl('https://google.com', 'dg'), dgIndex);
});

test('NG should dev to local ng', () => {
    assert.equal(m.Main.replaceBaseUrl(devNg, 'local4200'), localNg4200);
});

test('NG should dev to prod', () => {
    assert.equal(m.Main.replaceBaseUrl(devNg, 'prod'), prodNg);
});

test('should dev to prod', () => {
    assert.equal(m.Main.replaceBaseUrl(dev, 'prod'), prod);
});

test('NG should local ng to dev', () => {
    assert.equal(m.Main.replaceBaseUrl(localNg4200, 'dev'), devNg);
});

test('NG should local 8080 to local ng', () => {
    assert.equal(m.Main.replaceBaseUrl(localNg8080, 'local4200'), localNg4200);
});

test('NG should local ng to local 8080', () => {
    assert.equal(m.Main.replaceBaseUrl(localNg4200, 'local8080'), localNg8080);
});

test('should local 8080 to prod', () => {
    assert.equal(m.Main.replaceBaseUrl(localNg8080, 'prod'), prodNg);
});

test('should prod to local 8080', () => {
    assert.equal(m.Main.replaceBaseUrl(prodNg, 'local8080'), localNg8080);
});
