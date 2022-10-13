const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry:  "./src/main.ts",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
      modules: ['src', 'node_modules'] 
   },

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },

  mode: "development",

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    https: true
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "index.html").replace(/\\/g, '/'),
          to: path.resolve(__dirname, "dist").replace(/\\/g, '/')
        },
        {
          from: path.resolve(__dirname, "assets", "**", "*").replace(/\\/g, '/'),
          to: path.resolve(__dirname, "dist").replace(/\\/g, '/')
        }
      ]
    })
  ],

};