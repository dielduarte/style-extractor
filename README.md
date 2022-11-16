# Style Extractor

Extract all inline CSS from your HTML generating a css file for it.

## How to use

- First install the lib

  ```bash
  npm install --save style-extractor
  ```

- Import the lib and use it

  ```js
  import { extractStyle } from 'style-extractor';

  const { html, css } = extractStyle(`html input here`)
  
  console.log(html, css)
  ```

### Options

| Option | Values  | Default |
|---|---|---|
| strategy: Strategy  |  Strategy.atomic \| Strategy.scoped | Strategy.atomic |
| classPrefix: string  |  string value | es-  |

To configure the options you can pass an object as a second parameter, example:

```js

import { extractStyle } from 'style-extractor';
import type { Strategy } from 'style-extractor';

const { html, css } = extractStyle(
  `html input here`,
  { 
    strategy: Strategy.scoped, 
    classPrefix: 'my-prefix-' 
  }
)

console.log(html, css)
```

## Strategies

### Scoped
  For each inline style attribute found, the lib will generate a unique class with the whole value.
  
  e.g

  Given the input:

  ```html
   <div style="width: 100%;border: red;">
    <style>
      h1 { line-height: 20px; }
    </style>
    <h1 style="color: white; font-size: 14px;">title</h1>  
  </div>
  ```

  The HTML output would be:

  ```html
    <div class="es-chrTOf">
      <h1 class="es-dfoHTq">title</h1>  
    </div>
  ```

  and the CSS output would be:

  ```css
  .es-chrTOf { width: 100%;border: red; }
  h1 { line-height: 20px; }
  .es-dfoHTq { color: white; font-size: 14px; }
  ```

### Atomic
  For each css declaration found, the lib will create a unique class and reuse the class on all elements that also have the same css declaration value.


  e.g

  Given the input:

  ```html
   <div style="width: 100%;border: red;">
    <style>
      h1 { line-height: 20px; }
    </style>
    <h1 style="color: white; font-size: 14px;">title</h1>  
  </div>
  ```

  The HTML output would be:

  ```html
   <div class="es-cwtpWi es-gSvEpd">
    <h1 class="es-jTfyaK es-dhZwgM">title</h1>  
  </div>
  ```

  and the CSS output would be:

  ```css
   .es-cwtpWi { width:100%}
   .es-gSvEpd { border:red}
   h1 { line-height: 20px; }
   .es-jTfyaK { color:white}
   .es-dhZwgM { font-size:14px}
  ```


@TODOS

- [ ] deploy stable version to npm
- [ ] Option to create file in disk
