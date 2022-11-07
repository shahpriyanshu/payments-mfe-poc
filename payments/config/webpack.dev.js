const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("../package.json");
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin(
        {
          name: 'payments',
          filename:
            'remoteEntry.js',
          exposes: {
            './App':
              './src/App',
          },
          shared: {
              ...dependencies,
              react: {
                singleton: true,
                requiredVersion: dependencies["react"],
              },
              "react-dom": {
                singleton: true,
                requiredVersion: dependencies["react-dom"],
              },
            },
        }
      ),
  ],
};

module.exports = merge(commonConfig, devConfig);