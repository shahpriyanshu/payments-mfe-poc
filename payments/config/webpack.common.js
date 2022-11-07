const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
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
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};

module.exports = commonConfig;