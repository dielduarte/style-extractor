import type { StrategyModuleReturn } from "../index.types"
import { getId } from "../unique-id";

const createScopedStrategy = () => {
  let cssFile = '';
  return (): StrategyModuleReturn => {
    return {
      parse: (node, opts) => {
        const { start } = node.position
        const uniquePosition = `${start.line}${start.column}${start.offset}`;
        const id = getId(uniquePosition, opts);
        cssFile += `.${id} { ${node.properties.style} }\n`;
        node.properties.class = `${node.properties.class || ""}${id} `;
      },
      getCss: () => cssFile
    }
  }
}

export default createScopedStrategy()