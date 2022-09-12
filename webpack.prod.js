const { mergeWithRules } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend"
    },
  },
})(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "assets/js/[name].[chunkhash].js",
    clean: true,
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
        css: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
  ],
});
