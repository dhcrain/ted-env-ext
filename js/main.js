// https://code-maven.com/javascript-module-to-run-in-browser-and-in-node

(function () {
	"use strict";

	const TED = "/ted";
	const INDEX = "index";
	const LOCAL = "local/";
	const MODULE = "module/";
	const ENV_URLS = {
		local8080: "http://localhost:8080",
		local4200: "http://localhost:4200",
		dev: "https://micamdevw.michigan.gov/tpaas",
		qa: "https://miloginworkerqa.michigan.gov/tpaas",
		dg: "https://miloginworkerqa.michigan.gov/tpaasdg",
		prod: "https://miloginworker.michigan.gov/tpaas",
	};
	let isTedUrl = true;

	this.Main = Object.freeze({
		init,
		replaceBaseUrl,
		TED,
		INDEX,
		LOCAL,
		MODULE,
		ENV_URLS,
	});

	async function init(envButtons) {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		const activeTab = tabs[0];
		isTedUrl =
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

	function replaceBaseUrl(tab, targetId) {
		const newEnvBaseUrl = ENV_URLS[targetId];
		if (!isTedUrl) {
			bug.push('not TED url');
			// If you are not on a TED page will open that env index page
			return newEnvBaseUrl + TED + INDEX;
		}
		//  todo: strip uuid when switching envs

		let bug = [];

		let fromEnv = ''
		Object.keys(ENV_URLS).forEach(key => {
			if (tab.url.indexOf(ENV_URLS[key]) > -1) {
				fromEnv = key
			}
		})
		console.log(fromEnv)

		let urlParts = tab.url.split(TED);
		// console.log("urlParts " + urlParts);

		const currentIsLocal = urlParts.length == 1;
		// console.log("currentIsLocal " + currentIsLocal);

		const destinationIsLocal = newEnvBaseUrl.indexOf("localhost") > -1;
		// console.log("destinationIsLocal " + destinationIsLocal);

		const isNgPage =
			tab.url.indexOf(LOCAL) > -1 || tab.url.indexOf(MODULE) > -1;
		// console.log("isNgPage " + isNgPage);

		const destinationIsLocalNg =
			isNgPage && newEnvBaseUrl == ENV_URLS.local4200;
		// console.log("destinationIsLocalNg " + destinationIsLocalNg);

		// const devToLocal = urlParts[0] == ENV_URLS.dev && destinationIsLocal;
		// const localToDev = currentIsLocal && newEnvBaseUrl == ENV_URLS.dev;
		// const isSameEnv = devToLocal || localToDev;

		// determine if going from local to deploy or the opposite
		// determine if going from ng to non or the opposite

		if (isNgPage) {
			bug.push(1);
			if (destinationIsLocalNg) {
				bug.push(3);
				// anywhere to local ng need to replace module with local
				urlParts = tab.url
					.replace(MODULE, TED + LOCAL)
					.split(TED);
			} else if (currentIsLocal && !destinationIsLocalNg) {
				if (tab.url.indexOf(MODULE) > -1) {
					bug.push(1.5)
					urlParts = tab.url.split(ENV_URLS[fromEnv]);
				  } else {
					bug.push(2);
					// local ng to anywhere else need to replace local with module
					console.log(urlParts)
					urlParts = tab.url
					  .replace(LOCAL, TED + MODULE)
					  .split(TED);
				  }
			}
		}

		urlParts[0] = newEnvBaseUrl;
		if (!destinationIsLocal) {
			bug.push(6);
			urlParts.splice(1, 0, TED);
		} else {
			bug.push(7);
			urlParts.splice(1, 0, "/");
		}

		console.warn("bug: " + bug);
		return urlParts.join("");
	}
}.call(this));
