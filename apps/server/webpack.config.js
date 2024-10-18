const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server",
  target: "node",
  mode: process.env.NODE_ENV || "production",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader", 
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], 
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), 
  },
  devtool: "source-map", 
};
