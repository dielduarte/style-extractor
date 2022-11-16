export const withSharedParse = (cssFile, callback) => (...args) => {
  const [node] = args;
  const isStyle = node.tagName === 'style';

  if (isStyle) {
    cssFile += node.children[0].value;
  }

  if (!node.properties.style) {
    return;
  }

  callback(...args);
  node.properties.style = undefined;
};
