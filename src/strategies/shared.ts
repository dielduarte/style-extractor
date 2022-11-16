import { Element } from 'hast-util-to-html/lib/types';
import type { Options, Parse } from '../index.types';

// Mutating parameters by propose here
// since this function will be called when traversing ASTs
export const sharedParsing =
  (callback: Parse, cssFile: string) => (node: Element, opts: Options) => {
    const isStyle = node.tagName === 'style';

    if (isStyle) {
      // again another issue with types from unist :/
      cssFile += (node.children[0] as unknown as any).value;
    }

    if (!node.properties?.style) {
      return;
    }

    callback(node, opts);

    node.properties.style = undefined;
  };
