export enum Strategy {
  scoped = 'scoped',
  atomic = 'atomic',
}

export type StrategyModuleReturn = {
  parse: (node: any, opts: Options) => void;
  getCss: () => string;
};

export type Options = {
  strategy: Strategy;
  classPrefix: String;
};
