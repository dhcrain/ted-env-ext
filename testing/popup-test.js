'use strict'

const assert = require('assert');
const m = require('../js/main');

// RUN: node test.js ./popup-test.js

global.window = 'regular'
// uncomment for debug logging
// global.window = 'debug';

const qParams = "?pageNumber=1&orderBy=invoiceStartDate";
const uuid = "/70ceb6e7-776b-4a28-9c5a-18427965c345";
const localNg4200 = 'http://localhost:4200/local/contract/invoice/list';
const localNg8080 = 'http://localhost:8080/ted/module/contract/invoice/list';
const devNg = 'https://micamdevw.michigan.gov/tpaas/ted/module/contract/invoice/list';
const prodNg = 'https://miloginworker.michigan.gov/tpaas/ted/module/contract/invoice/list';

const dev = 'https://micamdevw.michigan.gov/tpaas/ted/electronicpayer/list';
const prod = 'https://miloginworker.michigan.gov/tpaas/ted/electronicpayer/list';
const local8080 = 'http://localhost:8080/ted/electronicpayer/list';

const notTed = 'https://google.com';
const local8080Index = 'http://localhost:8080/ted/index';
const dgIndex = 'https://miloginworkerqa.michigan.gov/tpaasdg/ted/index';


test('Switch envs and strip uuid devNg to prodNg keeping query params', () => {
    assert.equal(m.Main.replaceBaseUrl(devNg + uuid + qParams, 'prod'), prodNg + qParams);
});

test('Same env dont strip uuid devNg to localNg keeping query params', () => {
    assert.equal(m.Main.replaceBaseUrl(devNg + uuid + qParams, 'local4200'), localNg4200 + uuid + qParams);
});

test('Current tab is not TED to local', () => {
    assert.equal(m.Main.replaceBaseUrl(notTed, 'local8080'), local8080Index);
});

test('Current tab is not TED to DG', () => {
    assert.equal(m.Main.replaceBaseUrl(notTed, 'dg'), dgIndex);
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

test('should dev to local', () => {
    assert.equal(m.Main.replaceBaseUrl(dev, 'local8080'), local8080);
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
