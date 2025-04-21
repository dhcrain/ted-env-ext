// https://code-maven.com/javascript-module-to-run-in-browser-and-in-node

(function () {
	"use strict";

	const HTTPS = 'https://'
	const ADMIN = 'admin/'

	const ENV_URLS = [
		{service: 'eligibility', env: 'local', url: 'http://localhost:8002/admin/'},
		{service: 'eligibility', env: 'dev'},
		{service: 'eligibility', env: 'test'},
		{service: 'eligibility', env: 'stage'},
		{service: 'eligibility', env: 'prod'},
		{service: 'reports', env: 'local', url: 'http://localhost:8001/admin/'},
		{service: 'reports', env: 'dev'},
		{service: 'reports', env: 'test'},
		{service: 'reports', env: 'stage'},
		{service: 'reports', env: 'prod'},
		{service: 'benefit-hub', env: 'local', url: 'http://localhost:8000/admin/'},
		{service: 'benefit-hub', env: 'dev'},
		{service: 'benefit-hub', env: 'test'},
		{service: 'benefit-hub', env: 'stage'},
		{service: 'benefit-hub', env: 'prod'},
		{service: 'rewards', env: 'local', url: 'http://localhost:8004/admin/'},
		{service: 'rewards', env: 'dev'},
		{service: 'rewards', env: 'test'},
		{service: 'rewards', env: 'stage'},
		{service: 'rewards', env: 'prod'},
		{service: 'cerberus', env: 'local', url: 'http://localhost:8003/api/graphql'},
		{service: 'cerberus', env: 'dev', url: 'https://cerberus.cerberus.dev.k8s.pelotime.com/api/graphql/'},
		{service: 'cerberus', env: 'test', url: 'https://cerberus.ge.test.k8s.onepeloton.com/api/graphql/'},
		{service: 'cerberus', env: 'stage', url: 'https://cerberus.ge.stage.k8s.onepeloton.com/api/graphql/'},
		{service: 'cerberus', env: 'prod', url: 'https://benefits-gateway.onepeloton.com/api/graphql/'},
		{service: 'portal', env: 'local', url: 'http://localhost:3000/benefit-admin/uploads'},
		{service: 'portal', env: 'dev', url: 'https://dev--benefits.test.onepeloton.com/benefit-admin/uploads'},
		{service: 'portal', env: 'test', url: 'https://test--benefits.test.onepeloton.com/benefit-admin/uploads'},
		{service: 'portal', env: 'stage', url: 'http://benefits.test.onepeloton.com/benefit-admin/uploads'},
		{service: 'portal', env: 'prod', url: 'https://benefits.onepeloton.com/benefit-admin/uploads'},
		{service: 'admin', env: 'local', url: 'http://localhost:3000/partners/'},
		{service: 'admin', env: 'dev', url: 'https://dev--benefits-admin.test.onepeloton.com/partners'},
		{service: 'admin', env: 'test', url: 'https://test--benefits-admin.test.onepeloton.com/partners'},
		{service: 'admin', env: 'stage', url: 'http://benefits-admin.test.onepeloton.com/partners'},
		{service: 'admin', env: 'prod', url: 'https://admin.benefits.onepeloton.com/partners'},
	]

	this.Main = Object.freeze({
		init,
		getUrl,
		ENV_URLS
	});

	async function init() {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		const activeTab = tabs[0];
		return activeTab;
	}

	function getUrl(env, service) {
		const target = ENV_URLS.find(url => url.env == env && url.service == service)

		if (target.url) {
			return target.url
		} else {
			// For Django admin urls
			return `${HTTPS}${service}.ge.${env}.k8s.pelotime.com/${ADMIN}`
		}
	}

}.call(this));
