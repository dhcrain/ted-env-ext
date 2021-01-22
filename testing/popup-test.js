'use strict'

// We use the assert standard library to make assertions
const assert = require('assert');
const m = require('../js/main');

const localNg4200 = 'http://localhost:4200/local/contract/invoice/list';
const localNg8080 = 'http://localhost:8080/module/contract/invoice/list';
const devNg = 'https://micamdevw.michigan.gov/tpaas/ted/module/contract/invoice/list';
const prod = 'https://miloginworker.michigan.gov/tpaas/ted/module/contract/invoice/list';

test('NG should dev to local ng', () => {
    const tab = {url: devNg};
    assert.equal(m.Main.replaceBaseUrl(tab, 'local4200'), localNg4200);
});

test('NG should local ng to dev', () => {
    const tab = {url: localNg4200};
    assert.equal(m.Main.replaceBaseUrl(tab, 'dev'), devNg);
});

test('NG should local 8080 to local ng', () => {
    const tab = {url: localNg8080}
    assert.equal(m.Main.replaceBaseUrl(tab, 'local4200'), localNg4200);
});

test('NG should local ng to local 8080', () => {
    const tab = {url: localNg4200}
    assert.equal(m.Main.replaceBaseUrl(tab, 'local8080'), localNg8080);
});

test('should local to prod', () => {
    const tab = {url: localNg8080}
    assert.equal(m.Main.replaceBaseUrl(tab, 'prod'), prod);
});
