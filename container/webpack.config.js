const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("./package.json");

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader:
          'babel-loader',
        options: {
            "presets": [
                "@babel/preset-env",
               ["@babel/preset-react", {"runtime": "automatic"}]
            ]
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'shell',
        filename:
          'remoteEntry.js',
        remotes: {
            payments:
            'payments@http://localhost:8081/remoteEntry.js',
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
          }
      }
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};