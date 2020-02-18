## Static webpack boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![devDependencies Status](https://david-dm.org/dwyl/hapi-auth-jwt2/dev-status.svg)

A lightweight boilerplate for your next webpack based frontend project. Enjoy!

### Installation

Static webpack boilerplate requires the following...

- [Node.js (LTS Version)](http://nodejs.org/)
- [YarnPKG](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

Quick start:

```bash

# Install dependencies
yarn install

# Run dev server
yarn run dev

# To build dist folder
yarn run build

# Make it your own repo
rm -rf .git && git init

# Installing in a new directory of your choice

git clone https://github.com/ericz99/static-webpack-boilerplate.git <your folder>

```

### Features

- ES6 Support via [babel](https://babeljs.io/) (v7)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
- Airbnb style via [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

When you run `yarn run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.

### Deployment [ Will add quick deployment later ]

This webpack boilerplate provides production ready deployment onto cloud based service like heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## App Info

### Author

Eric Zhang

### Version

1.0.0

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
