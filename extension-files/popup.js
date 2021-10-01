"use strict"

window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

async function getActiveTab() {
  const tab = await Main.init(envButtons);
  return tab;
}

const envButtons = document.getElementsByClassName("evnButton");

for (const button of envButtons) {
  button.onclick = async function(event) {
    try {
      // console.log(event);
      const activeTab = await getActiveTab();
      const newUrl = Main.replaceBaseUrl(activeTab.url, event.target.id);

      // Open in a new tab if ctrl or meta is pressed at MouseClick
      if (event.ctrlKey || event.metaKey) {
        browser.tabs.create({url : newUrl, index : activeTab.index + 1});
      } else {
        browser.tabs.update(activeTab.id, {url : newUrl});
      }

      window.close();
    } catch (error) {
      console.error(error);
    }
  };
}
