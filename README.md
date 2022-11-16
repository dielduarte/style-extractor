# Style Extractor - WIP

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

| Option | Values  |
|---|---|
| strategy: Strategy  |  Strategy.atomic \| Strategy.scoped **Default =** Strategy.atomic |
| classPrefix: string  |  string value **Default = es-** |

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
  For each inline style attribute found it will generate a unique class with the whole value.
  
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

  ```

  and the CSS output would be:

  ```css
  ```

### Atomic
  For each css declaration found it will create a unique class and reuse the class on all elements that also have the same css declaration value.


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

  ```

  and the CSS output would be:

  ```css
  ```


@TODOS
- [ ] option to create file in disk