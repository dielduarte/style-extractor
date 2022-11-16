import type { Element } from 'hast-util-to-html/lib/types';

export enum Strategy {
  scoped = 'scoped',
  atomic = 'atomic',
}

export type Parse = (node: Element, opts: Options) => void;

export type StrategyModuleReturn = {
  parse: Parse;
  getCss: () => string;
};

export type Options = {
  strategy: Strategy;
  classPrefix: String;
};
