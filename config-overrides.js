const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const colors = require('./src/configs/colors');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: colors,
    },
  }),
);
