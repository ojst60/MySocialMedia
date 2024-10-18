const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: process.env.NODE_ENV || "production",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,                   // Process TypeScript files
        use: 'ts-loader',                // Use ts-loader for TypeScript
        exclude: /node_modules/,         // Exclude node_modules
      },
      {
        test: /\.html$/,                 // Ignore HTML files if necessary
        use: 'ignore-loader'             // Use ignore-loader for HTML files
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], 
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"), 
  },
  devtool: "source-map", 
  externals: {
    // Exclude node modules
    bcrypt: 'commonjs bcrypt',
    mongodb: 'commonjs mongodb',
    mongoose: 'commonjs mongoose',
    express: 'commonjs express',
    'node-gyp': 'commonjs node-gyp',
    'aws-sdk': 'commonjs aws-sdk',
    'mock-aws-s3': 'commonjs mock-aws-s3',
    nock: 'commonjs nock',
    // Add other modules as necessary
  },
};
