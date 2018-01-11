## Project Home ##
https://confluence.mdgms.com/display/SSPDRS/Home

## Prerequisites ##
- The current LTS version of [Node](https://nodejs.org/en/download/) for your platform
- Ionic CLI
- Cordova CLI

> npm install -g ionic cordova

## Run Project in Browser ##
Pull down the project from git and from the root directory of the project run
these commands in order.
> npm install

> ionic cordova platform add browser

> ionic cordova run browser

Running those commands will install any dependencies, build the www dist, launch
a local server with livereload and launch the app within your default browser.

## Run Project on iOS simulator (macOS Only) ##
Pull down the project from git and from the root directory of the project run
these commands in order.
> npm install

> ionic cordova run ios

In order to list out the simulator options use the following command.
> ionic cordova emulate ios --list

Then you can run with a specific simulator.
> ionic cordova run ios --target="iPad-Air-2, 11.2"

## Debug Settings
If built with debug settings enabled you can go into the app settings and point the screener and the filter urls to a local dev server or to any of the various environments where those components get deployed.

Production build command should be 'ionic cordova build --prod' in order to remove angular debug mode.

## Notes
- Uses Chart.js: http://www.chartjs.org/samples/latest/

- The Push plugin requires CocoaPods to be installed. Please check the iOS details section of the push plugin for any compilation issues. The push plugin documentation can be found here: https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md
