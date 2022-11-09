import type { StrategyModuleReturn } from '../index.types';
import { getId } from '../unique-id';

export default (): StrategyModuleReturn => {
  let cssFile = '';

  return {
    parse: (node, opts) => {
      const isStyle = node.tagName === 'style';

      if (isStyle) {
        cssFile += node.children[0].value;
      }

      if (!node.properties.style) {
        return;
      }

      const { start } = node.position;
      const uniquePosition = `${start.line}${start.column}${start.offset}`;
      const id = getId(uniquePosition, opts);
      cssFile += `.${id} { ${node.properties.style} }\n`;
      node.properties.class = `${node.properties.class || ''}${id} `;
      node.properties.style = undefined;
    },
    getCss: () => cssFile,
  };
};
