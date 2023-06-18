const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 *   "_moduleAliases": {
    "@": "src"
  },
 */
module.exports = {
  entry: path.resolve(__dirname, "./src/main.ts"),
  devtool: "source-map",
  // target: "",
  // mode: "development",
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
    // roots: [__dirname],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/atoms": path.resolve(__dirname, "src/atoms"),
      "@/molecules": path.resolve(__dirname, "src/molecules"),
      "@/helpers": path.resolve(__dirname, "src/helpers"),
      "@/organism": path.resolve(__dirname, "src/organism"),
      "@/math": path.resolve(__dirname, "src/math"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    fallback: { path: require.resolve("path-browserify") },
  },
  // resolveLoader:
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "nexious-library",
      template: "src/template.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
};
