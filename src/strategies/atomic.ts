import type { StrategyModuleReturn } from '../index.types';
import { getId } from '../unique-id';
import { sharedParsing } from './shared';

const format = (style: string) => {
  return style.replace(/\s/g, '');
};

const toArray = (style: string, separator = ';') => style.split(separator);

export default (): StrategyModuleReturn => {
  let cssFile = '';
  const atomicMap = new Set();

  return {
    parse: sharedParsing(
      (node, opts) => {
        if (!node.properties) {
          return;
        }

        // ts says style can be something else other than a string here
        // but the problem is just the way a property can is represented
        // which is basically a generic, style is always a string.
        // export interface Properties {
        //   [PropertyName: string]: boolean | number | string | null | undefined | Array<string | number>;
        // }
        toArray(node.properties.style as unknown as string)
          .filter(Boolean)
          .map(format)
          .forEach((style) => {
            const id = getId(style, opts);

            if (!atomicMap.has(id)) {
              atomicMap.add(id);
              cssFile += `.${id} { ${style}}\n`;
            }

            if (!node.properties) {
              node.properties = {};
            }

            node.properties.class = `${node.properties.class || ''}${id} `;
          });
      },
      (value) => (cssFile += value),
    ),
    getCss: () => cssFile,
  };
};
