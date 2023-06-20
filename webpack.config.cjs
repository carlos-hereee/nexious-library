const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const tsconfig = require("./tsconfig.json");
const packagejson = require("./package.json");

const SRC_DIR = path.resolve(__dirname, "./src");
const DIST_DIR = path.resolve(__dirname, "./dist");
// add this line at the very main file of your app before any code

// let mode = 'development'
let target = "web";

module.exports = {
  entry: [
    SRC_DIR + "/atoms/index.ts",
    SRC_DIR + "/molecules/index.ts",
    SRC_DIR + "/organism/index.ts",
    SRC_DIR + "/math/index.ts",
  ],
  devtool: "source-map",
  target: target,
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$|jsx/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    root: __dirname,
    alias: packagejson._moduleAliases || { // ) //   {} //   }, //     return path; //     ); //       `src/${tsconfig.compilerOptions.paths[pathname][0]}` //       __dirname, //     path[pathname] = path.resolve( //   (path, pathname) => { // Object.keys(tsconfig.compilerOptions.paths).reduce(
      "@nexious-atoms": path.resolve(__dirname, "src/atoms"),
      "@nexious-molecules": path.resolve(__dirname, "src/molecules"),
      "@nexious-helpers": path.resolve(__dirname, "src/helpers"),
      "@nexious-organism": path.resolve(__dirname, "src/organism"),
      "@nexious-math": path.resolve(__dirname, "src/math"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    fallback: { path: require.resolve("path-browserify"), fs: false },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "nexious-library",
      template: "src/template.html",
    }),
  ],
  devServer: {
    static: {
      directory: DIST_DIR,
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    path: DIST_DIR,
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
};
