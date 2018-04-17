## Project Home ##
https://confluence.mdgms.com/display/SSPDRS/Home

## Prerequisites ##
- The current LTS version of [Node](https://nodejs.org/en/download/) for your platform
- Ionic CLI
- Cordova CLI
- npm configured to use FactSet npm repository

> npm config set registry http://artifactory.factset.com/artifactory/api/npm/npm/

> npm config set @fds:registry http://artifactory.factset.com/artifactory/api/npm/npm-fds/

> npm install -g ionic cordova

## Run Project in Browser ##
Pull down the project from git and from the root directory of the project run
these commands in order. Note that any code using a native plugin will not work
in the browser since the plugins require a platform specific device to run properly.
> npm install

> ionic cordova platform add browser

> ionic cordova run browser --livereload

This command will work as well since it will make the calls to the FinAPI from
a host that is included in the API gateway whitelist.
> ionic serve --address localhost --port 8080

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

## Update The Project
You may have local node_modules or command line tools that are out of date and you can run the following command to review your environment and suggest changes that could update/fix your modules and/or command line tools.
> ionic doctor check

## Notes
- Uses Chart.js: http://www.chartjs.org/samples/latest/

- The Push plugin requires CocoaPods to be installed. Please check the iOS details section of the push plugin for any compilation issues. The push plugin documentation can be found here: https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md

- Make sure to open up 'Sector SPDRs.xcworkspace' in Xcode instead of just the project so that the pod dependencies can be built and found when building the app.
