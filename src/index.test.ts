import { expect, it, describe, vi } from 'vitest';

import { extractStyle } from './index';
import { Strategy } from './index.types';

const html = `
  <div style="width: 100%;border: red;">
    <style>
      h1 { line-height: 20px; }
    </style>
    <h1 style="color: white; font-size: 14px;">title</h1>  
  </div>
`;

const defaultOptions = {
  strategy: Strategy.scoped,
  classPrefix: 'es-',
};

describe('extractStyle => scoped', () => {
  it('should remove all inline styles', async () => {
    const result = await extractStyle(html, defaultOptions);
    expect(result.html).toMatchSnapshot();
  });

  it('should remove all inline style tags', async () => {
    const result = await extractStyle(html, defaultOptions);

    expect(result.html).toMatchSnapshot();
  });

  it('should generate scoped css', async () => {
    const result = await extractStyle(html, defaultOptions);

    expect(result.css).toMatchSnapshot();
  });
});

describe('extractStyle => atomic', () => {
  const options = { ...defaultOptions, strategy: Strategy.atomic };

  it('should remove all inline styles', async () => {
    const result = await extractStyle(html, options);
    expect(result.html).toMatchSnapshot();
  });

  it('should remove all inline style tags', async () => {
    const result = await extractStyle(html, options);

    expect(result.html).toMatchSnapshot();
  });

  it('should generate atomic css', async () => {
    const result = await extractStyle(html, options);

    expect(result.css).toMatchSnapshot();
  });
});
