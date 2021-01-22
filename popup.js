"use strict"

const envButtons = document.getElementsByClassName("evnButton");

async function getActiveTab() {
  const tab = await Main.init(envButtons);
  return tab;
}


for (const button of envButtons) {
  button.onclick = async function (event) {
    try {
      // console.log(event);
      const activeTab = await getActiveTab()
      const newUrl = Main.replaceBaseUrl(activeTab, event.target.id);

      // Open in a new tab if ctrl or meta is pressed at MouseClick
      if (event.ctrlKey || event.metaKey) {
        chrome.tabs.create({ url: newUrl, index: activeTab.index + 1 });
      } else {
        chrome.tabs.update(activeTab.id, { url: newUrl });
      }

      window.close();
    } catch (error) {
      console.error(error);
    }
  };
}
