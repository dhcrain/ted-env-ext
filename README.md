# ted-env-switcher

Click on the icons in the Chrome extension shortcut to open the page you are on in different environments.

Control click to open in a new tab

PRs welcome: https://github.com/dhcrain/ted-env-ext

To package:
'''bash
zip -r -FS ../ted-env-extension-0.6.2.xpi * --exclude '*.git*' --exclude 'testing/*' --exclude '*.zip' --exclude '*.xpi'
'''

For Firefox rename file to ted-env-extension-0.6.2.xpi
And update to current version number
Update updates.json with new version