# weflex-ui

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]

The UI Library that used by WeFlex Products and Developers.

## Get Started

```jsx
import UIFramework from 'weflex-ui';

class ExampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }
  onLogin() {
    // this.state.username
    // this.state.password
  }
  render() {
    return (
      <UIFramework>
        <UIFramework.Row name="username">
          <UIFramework.TextInput bindStateCtx={this} bindStateName="username" />
        </UIFramework.Row>
        <UIFramework.Row name="username">
          <UITextInput bindStateCtx={this} bindStateName="username" password={true} />
        </UIFramework.Row>
        <UIFramework.Row name="username">
          <UIFramework.Button text="login" onClick={this.onLogin.bind(this)} />
        </UIFramework.Row>
      </UIFramework>
    )
  }
}

```

## Components

See [src/](./src) for components.

## Installation

```sh
$ npm install weflex-ui --save-dev
```

## Tests

```sh
$ npm install
$ npm test
```

## Example

```sh
$ cd examples
$ npm install && npm start
$ open ./index.html
```

## License

MIT @ WeFlex

[npm-image]: https://img.shields.io/npm/v/weflex-ui.svg?style=flat-square
[npm-url]: https://npmjs.org/package/weflex-ui
[travis-image]: https://img.shields.io/travis/weflex/weflex-ui.svg?style=flat-square
[travis-url]: https://travis-ci.org/weflex/weflex-ui
[david-image]: http://img.shields.io/david/weflex/weflex-ui.svg?style=flat-square
[david-url]: https://david-dm.org/weflex/weflex-ui
[downloads-image]: http://img.shields.io/npm/dm/weflex-ui.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/weflex-ui