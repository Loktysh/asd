const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const isProduction = env.production;

  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "./build"),
      filename: "index_bundle.[contenthash].js",
      // assetModuleFilename: "assets/[hash][ext][query]",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "src"),
      },
      client: {
        overlay: {
          warnings: false,
          errors: false,
        },
        // logging: 'none'
      },
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          // test: /\.s[ac]ss$/i,
          test: /\.(s*)css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[hash][ext][query]",
          },
        },
        {
          test: /\.svg$/,
          type: "asset/resource",
          generator: {
            filename: "icons/[hash][ext]",
          },
          use: "svgo-loader",
        },
      ],
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: "all",
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "styles.[hash].css",
        chunkFilename: "[id].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      // new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "./src/assets", to: "assets" }],
      }),
    ],
  };
};
