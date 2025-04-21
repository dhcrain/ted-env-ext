"use strict"

const envButtons = document.getElementsByTagName('button')
const table = document.getElementById('env-service-links');
const envColumns = document.getElementsByClassName('env-cols')

async function getActiveTab() {
  const tab = await Main.init();
  return tab;
}

for (const row of table.rows) {
  console.log(row)
  const buttons = row.getElementsByClassName('service-btn')
  Array.from(buttons).forEach((cell, colIndex) => {
    cell.onclick = async function(event) {
      try {
        const activeTab = await getActiveTab();
        const service = row.id
        const env = envColumns[colIndex+1].id

        const newUrl = Main.getUrl(env, service);

        console.log(newUrl)

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
    }
  });
}
