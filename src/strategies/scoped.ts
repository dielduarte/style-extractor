import type { Options, StrategyModuleReturn } from '../index.types';
import { getId } from '../unique-id';
import { sharedParsing } from './shared';

export default (): StrategyModuleReturn => {
  let cssFile = '';

  return {
    parse: sharedParsing((node, opts) => {
      if (!(node.position && node.properties)) {
        return;
      }

      const { start } = node.position;
      const uniquePosition = `${start.line}${start.column}${start.offset}`;
      const id = getId(uniquePosition, opts);
      cssFile += `.${id} { ${node.properties.style} }\n`;
      node.properties.class = `${node.properties.class || ''}${id} `;
    }, cssFile),
    getCss: () => cssFile,
  };
};
