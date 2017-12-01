## Project Home ##
https://confluence.mdgms.com/display/SSPDRS/Home

## Prerequisites ##
- The current LTS version of [Node](https://nodejs.org/en/download/) for your platform
- Ionic 2 `npm install -g ionic cordova`

## Run Project in Browser ##
Pull down the project from git and from the root directory of the project run
these commands in order.
- `npm install`
- `ionic serve`

Running those commands will install any dependencies, build the www dist, launch
a local server with livereload and launch the app within your default browser.

## Run Project on iOS simulator (macOS Only) ##
Pull down the project from git and from the root directory of the project run
these commands in order.
- `npm install`
- `ionic cordova run ios`

## Debug Settings
If built with debug settings enabled you can go into the app settings and point the screener and the filter urls to a local dev server or to any of the various environments where those components get deployed.

Production build command should be 'ionic cordova build --prod' in order to remove angular debug mode.