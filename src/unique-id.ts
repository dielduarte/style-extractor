import murmurhash from 'murmurhash';
import { Options } from './index.types';

// This code it a copy and paste from styled-components codebase
// ref => https://github.com/styled-components/styled-components/blob/v3.3.3/src/utils/generateAlphabeticName.js#L13
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
const charsLength = 52;

/* Start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code) =>
  String.fromCharCode(code + (code > 25 ? 39 : 97));

/* Input a number, usually a hash and convert it to base-52 */
const generateAlphabeticName = (code) => {
  let name = '';
  let x;

  /* Get a char and divide by alphabet-length */
  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
};

export const getId = (value: string, opts: Options) => {
  return `${opts.classPrefix}${generateAlphabeticName(murmurhash.v3(value))}`;
};
