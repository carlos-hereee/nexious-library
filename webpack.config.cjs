// import path from "path";
// import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
// import plugin from "webpack-bundle-analyzer";
const path = require("path");
const plugin = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx|ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plungins: [new plugin.BundleAnalyzerPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
  output: {
    // filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
