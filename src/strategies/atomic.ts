import type { StrategyModuleReturn } from '../index.types';
import { getId } from '../unique-id';

const format = (style: string) => {
  return style.replace(/\s/g, '');
};

const toArray = (style: string, separator = ';') => style.split(separator);

const createAtomicStrategy = () => {
  let cssFile = '';
  const atomicMap = new Set();

  return (): StrategyModuleReturn => {
    return {
      parse: (node, opts) => {
        const isStyle = node.tagName === 'style';

        if (isStyle) {
          cssFile += node.children[0].value;
        }

        if (!node.properties.style) {
          return;
        }

        toArray(node.properties.style)
          .filter(Boolean)
          .map(format)
          .forEach((style) => {
            const id = getId(style, opts);

            if (!atomicMap.has(id)) {
              atomicMap.add(id);
              cssFile += `.${id} { ${style}}\n`;
            }

            node.properties.class = `${node.properties.class || ''}${id} `;
          });
      },
      getCss: () => cssFile,
    };
  };
};

export default createAtomicStrategy();
