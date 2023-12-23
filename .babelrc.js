const consoleTrace = console.trace.bind(console);
console.trace = (message, ...optionalParams) => {
  if (
    typeof message === 'string' &&
    message.startsWith('`isModuleDeclaration` has been deprecated')
  ) {
    return undefined;
  }
  return consoleTrace(message, ...optionalParams);
};

module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
