const { mergeWithRules } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
})(common, {
  mode: "development",
  devServer: {
    static: {
      directory: "./public",
    },
    hot: true,
    historyApiFallback: true,
    port: 3000,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader"],
      },

      {
        test: /\.s(c|a)ss$/,
        use: ["style-loader"],
      },
    ],
  },
});
