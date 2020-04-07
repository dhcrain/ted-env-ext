'use strict'

chrome.runtime.onInstalled.addListener(function() {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: '127.0.0.1', ports: [8080, 4200] }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'localhost', ports: [8080, 4200] }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '(micamdevw|miloginworkerqa|miloginworker)\.michigan.gov', schemes: ['https'] }
          }),
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

});