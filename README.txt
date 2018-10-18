npm init    [package.json appeared]

webpack:
npm install -D webpack webpack-cli   [package-lock.json appeared] [-D - locally, -g - globally]

babel:
npm install -D babel-loader babel-core
npm install -D babel-preset-env
npm install -D css-loader html-webpack-plugin style-loader extract-text-webpack-plugin

eslint:
npm install eslint --save-dev
./node_modules/.bin/eslint --init    [blablabla] [it will install some useful packages]

[some magic for working:]
[add webpack.config.js]

webpack --mode development

npm run lint     [run eslint]
npm run build    [run project]
