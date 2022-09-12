const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dotenv = require("dotenv");
const { DefinePlugin } = require("webpack");

dotenv.config();

const config = {
  entry: ["./src/index.ts"],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      public: path.resolve(__dirname, "public/"),
      src: path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2020",
          tsconfigRaw: require("./tsconfig.json"),
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.s(c|a)ss$/,
        use: ["css-loader", "sass-loader"],
        exclude: /\.module\.s[ac]ss$/,
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]_[local]__[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
        include: /\.module\.s[ac]ss$/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "@svgr/webpack",
          },
          "url-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name]-[hash].[ext]",
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      "process.env": {
        TEST_ENV: JSON.stringify(process.env.TEST_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};

module.exports = config;
