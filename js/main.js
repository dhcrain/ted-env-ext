// https://code-maven.com/javascript-module-to-run-in-browser-and-in-node

(function () {
	"use strict";

	const TED = "ted";
	const INDEX = "/index";
	const LOCAL = "local/";
	const MODULE = "module/";
	const ENV_URLS = {
		local8080: "http://localhost:8080/",
		local4200: "http://localhost:4200/",
		dev: "https://micamdevw.michigan.gov/tpaas/",
		qa: "https://miloginworkerqa.michigan.gov/tpaas/",
		dg: "https://miloginworkerqa.michigan.gov/tpaasdg/",
		prod: "https://miloginworker.michigan.gov/tpaas/",
	};

	let bugs = [];

	this.Main = Object.freeze({
		init,
		replaceBaseUrl
	});

	async function init(envButtons) {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		const activeTab = tabs[0];
		const isTedUrl =
			Object.values(ENV_URLS).findIndex((url) => {
				return activeTab.url.startsWith(url);
			}, activeTab.url) > -1;
		// Display text based on what the current url is
		const text = isTedUrl
			? "Open this page in what environment?"
			: "Go to TED environment";
		const welcomeText = document.getElementById("welcome-text");
		welcomeText.innerHTML = text;
		return activeTab;
	}

	function replaceBaseUrl(url, targetId) {
		const newEnvBaseUrl = ENV_URLS[targetId];

		let fromEnv = Object.keys(ENV_URLS).find(key => url.indexOf(ENV_URLS[key]) > -1)

		if (!fromEnv) {
			// If you are not on a TED page will open that env index page
			bug('not TED url');
			return newEnvBaseUrl + TED + INDEX;
		}

		const currentIsLocal = fromEnv == 'local4200' || fromEnv == 'local8080'

		const destinationIsLocal = newEnvBaseUrl.indexOf("localhost") > -1;

		const isNgPage = url.indexOf(LOCAL) > -1 || url.indexOf(MODULE) > -1;

		const destinationIsLocalNg = isNgPage && newEnvBaseUrl == ENV_URLS.local4200;

		// clean url, remove /ted or module or local....
		url = url.replace(ENV_URLS[fromEnv], '').replace(TED, '').replace(MODULE, '').replace(LOCAL, '');
		while( url.charAt(0) == '/' ) {
			url = url.substring(1);
		}

		const devToLocal = fromEnv == 'dev' && destinationIsLocal;
		const localToDev = currentIsLocal && newEnvBaseUrl == ENV_URLS.dev;
		const isSameEnv = devToLocal || localToDev;

		bug('devToLocal: ' + devToLocal);
		bug('localToDev: ' + localToDev);
		bug('isSameEnv: ' + isSameEnv);

		//  strip uuid when switching envs
		if (!isSameEnv) {
			bug('!isSameEnv strip uuid')
			url = url.replaceAll(/\/(\w+\-){4}\w+/g, '');
		}

		// make new url
		if (isNgPage) {
			bug('isNgPage')
			if (destinationIsLocalNg) {
				bug('ng destinationIsLocal')
				url = LOCAL + url;
			} else {
				bug('not local ng page')
				url = TED + '/' + MODULE + url;
			}
		} else {
			bug('Not Angular Page')
			url = TED + '/' + url;
		}

		if (window == 'debug') {
			console.warn("bugs: " + bugs);
		}
		bugs = [];

		return newEnvBaseUrl + url;
	}

	function bug(newBug) {
		bugs.push(newBug);
	}

}.call(this));
