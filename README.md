<!-- markdownlint-disable first-line-h1 -->
<h1 align="center">Welcome to editorjs-element 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/editorjs-element" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/editorjs-element.svg">
  </a>
  <a href="https://github.com/hata6502/editorjs-element/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://lgtm.com/projects/g/hata6502/editorjs-element/alerts/">
    <img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/hata6502/editorjs-element.svg?logo=lgtm&logoWidth=18"/>
  </a>
  <a href="https://lgtm.com/projects/g/hata6502/editorjs-element/context:javascript">
    <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/hata6502/editorjs-element.svg?logo=lgtm&logoWidth=18"/>
  </a>
  <a href="https://twitter.com/hata6502" target="_blank">
    <img alt="Twitter: hata6502" src="https://img.shields.io/twitter/follow/hata6502.svg?style=social" />
  </a>
</p>

> Shadowed Editor.js element with iframe

## 💡 Motivation

DOM event, CSS Style, etc may conflict each other when multiple Editor.js instances are launched in same page.
By launching Editor.js in iframe, these problems are resolved forcibly. This repository provides the template of Editor.js in iframe.

## Usage

Launch editorjs-element by loading [dist/index.html](https://github.com/hata6502/editorjs-element/blob/main/dist/index.html) in iframe.

```html
<iframe src="index.html"></iframe>
```

editorjs-element can be communicated via [window.postMessage](https://developer.mozilla.org/ja/docs/Web/API/Window/postMessage).
The message interface is [here](https://github.com/hata6502/editorjs-element/blob/main/dist/index.d.ts),
and example is [here (window.addEventListener)](https://github.com/hata6502/editorjs-inline/blob/master/src/index.ts).

This repository is a template, please fork it in order to customize Editor.js!

## Build

```sh
yarn webpack
```

## Run tests

```sh
yarn test
```

## Author

<img alt="hata6502" src="https://avatars.githubusercontent.com/hata6502" width="48" /> **hata6502**

- Website: <https://b-hood.site/>
- Twitter: [@hata6502](https://twitter.com/hata6502)
- Github: [@hata6502](https://github.com/hata6502)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/hata6502/editorjs-element/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [hata6502](https://github.com/hata6502).<br />
This project is [MIT](https://github.com/hata6502/editorjs-element/blob/master/LICENSE) licensed.

## Disclaimer

Please see [DISCLAIMER.md](https://github.com/hata6502/editorjs-element/blob/master/DISCLAIMER.md).

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
