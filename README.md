# DEPRECATED
## This project has been abandoned

# µFront

<p align="center">
 <img src="./ufront-logo.png" alt="Ufront" title="UFront Logo" width="250" height="250" />
</p>

> A library for microfrontend section creation with react

[![NPM](https://img.shields.io/npm/v/ufront)](https://www.npmjs.com/package/ufront) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ufront
```

## Usage

```tsx
import React, { Component } from 'react'

import { UFront } from 'ufront'

class Example extends Component {
  render() {
    return <UFront host="SECTION HOST" name="SECTION NAME"/>
  }
}
```

Notes: To see an example of how to create a microfrontend section that could be called using this component, visit [microfrontend-section-ts](https://github.com/kaito002/react-microfrontend-section-ts)

## License
MIT

Copyright 2020, Carlos Montes [kaito](https://github.com/kaito002)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
