module.exports = (storybookConfig, env) => {
  const config = env === 'PRODUCTION'
    ? require('react-scripts-ts/config/webpack.config.prod.js')
    : require('react-scripts-ts/config/webpack.config.dev.js');

  return Object.assign({}, storybookConfig, {
    module: config.module,
    resolve: config.resolve
  });
};
