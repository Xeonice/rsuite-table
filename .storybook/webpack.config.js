const path = require('path');
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.less$/,
    loaders: ["style-loader", "css-loader", "less-loader"],
    include: path.resolve(__dirname, '../')
  });
  return storybookBaseConfig;
};
