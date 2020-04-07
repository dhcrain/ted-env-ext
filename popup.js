'use strict'

const ted = '/ted/';
const index = 'index'
const local = '/local/';
const tedModule = '/ted/module/'
const envUrls = {
  local8080:  "http://localhost:8080",
  local4200:  "http://localhost:4200/local",
  dev:        "https://micamdevw.michigan.gov/tpaas",
  qa:         "https://miloginworkerqa.michigan.gov/tpaas",
  dg:         "https://miloginworkerqa.michigan.gov/tpaasdg",
  prod:       "https://miloginworker.michigan.gov/tpaas",
};

const envButtons = document.getElementsByClassName('evnButton');

// not used yet? but will need to account for switched between the different local envs
function sourceUrlToDestination(url) {
	if (!isLocal4200(url)) {
		return null;
	} else {
		if (url.indexOf(tedModule) > -1) {
			return url.replace(tedModule, local);
		} else if (url.indexOf(local) > -1) {
			return url.replace(local, tedModule);
		} else {
			return null;
		}
	}
}

function replaceBaseUrl(tab, baseUrl) {
  let urlParts = tab.url.split(ted);
  urlParts.splice(1, 0, ted);
  urlParts[0] = baseUrl;
  return urlParts.join('');
}


for (const button of envButtons) {
  button.onclick = async function(event) {
    try {
      const newEnvBaseUrl = envUrls[event.target.id];
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      let newUrl = ''

      // If you are on a TED page it will switch envs, else will open that env index page
      const isTedUrl = Object.values(envUrls).findIndex((url) => { return activeTab.url.startsWith(url);}, activeTab.url) > -1;
      if (isTedUrl) {
        newUrl = replaceBaseUrl(activeTab, newEnvBaseUrl);
      } else {
        newUrl = newEnvBaseUrl + ted + index;
      }

      // Open in a new tab if ctrl or meta is pressed at MouseClick
      if (event.ctrlKey || event.metaKey) {
        chrome.tabs.create({url: newUrl, index: activeTab.index + 1});
      } else {
        chrome.tabs.update(activeTab.id, {url: newUrl});
      }

      window.close()
    } catch (error) {
      console.error(error);
    }

  };
}
