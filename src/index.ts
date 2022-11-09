import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";

import { Options, Strategy } from "./index.types";

import atomic from "./strategies/atomic";
import scoped from "./strategies/scoped";

const defaultOptions: Options = {
  strategy: Strategy.atomic,
  classPrefix: "es-",
};

const strategies = {
  [Strategy.atomic]: atomic,
  [Strategy.scoped]: scoped,
};

export const extractStyle = async (
  initialHtml: string,
  opts: Options = defaultOptions,
) => {
  const tree = fromHtml(initialHtml);
  const strategy = strategies[opts.strategy]();

  visit(tree, "element", (node) => {
    strategy.parse(node, opts);
  });

  remove(tree, (node) => node.tagName === "style");

  return {
    // @TODO remove extra tags
    html: toHtml(tree, { omitOptionalTags: true }),
    css: strategy.getCss(),
  };
};
