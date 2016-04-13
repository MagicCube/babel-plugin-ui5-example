# babel-ui5-plugin-example
An example of how to use [babel-ui5-plugin](https://github.com/MagicCube/babel-plugin-ui5) with Babel 6.

## Installation
+ Execute `npm install` in the root folder.
+ Download and unzip the latest [OpenUI5](http://sap.github.io/openui5/download.html),
  rename the folder `openui5-runtime-1.x.x` to `openui5-runtime`, and put the folder
  into `public/lib`. The project folder will then look like this

## Build with Gulp (Recommended)
```
$ gulp
```
`gulp clean` and `gulp build` are supported, and module-based building command `gulp build:example` is also supported


## Run
```
$ npm start
```
Open `http://localhost:8080/` in your browser.
