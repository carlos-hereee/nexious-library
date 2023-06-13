// import path from "path";
// import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
// import plugin from "webpack-bundle-analyzer";
const path = require("path");
// const plugin = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@nexious-library/atoms": path.resolve(__dirname, "src/atoms"),
      "@nexious-library/helpers": path.resolve(__dirname, "src/helpers"),
      "@nexious-library/molecules": path.resolve(__dirname, "src/molecules"),
      "@nexious-library/math": path.resolve(__dirname, "src/math"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  // plugins: [new plugin.BundleAnalyzerPlugin()],
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
  devServer: {
    static: path.join(__dirname, "./dist"),
    port: 8080,
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
