const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/payments/latest/'
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
         shared: packageJson.dependencies,
        }
      ),
  ],
};

module.exports = merge(commonConfig, prodConfig);