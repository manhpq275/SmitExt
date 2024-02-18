const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, agr) => {
  return {
    mode: agr.mode,
    entry: {
      popup: path.join(__dirname, "src", "js", "popup.js"),
      options: path.join(__dirname, "src", "js", "options.js"),
      background: path.join(__dirname, "src", "js", "background.js"),
      "content-script": path.join(__dirname, "src", "js", "content-script.js"),
    },
    output: {
      clean: true,
      publicPath: "/",
      path: path.join(__dirname, agr.mode === "development" ? "build" : `build-resources/${env.NODE_ENV}`),
      // filename: "static/js/main.[contenthash:6].js",
      assetModuleFilename: 'static/images/[hash][ext][query]'
    },
    resolve: {
      alias: {
        // '@smit-app': path.resolve(__dirname, './src/smit-app'),
        // '@vue-app': path.resolve(__dirname, './src/vue-app'),
        // '@data': path.resolve(__dirname, './src/vue-app/data'),
        '@fonts': path.resolve(__dirname, './src/assets/fonts'),
        // '@pages': path.resolve(__dirname, './src/vue-app/pages'),
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@styles': path.resolve(__dirname, './src/assets/styles')
        // '@constant': path.resolve(__dirname, './src/vue-app/constant'),
        // '@components': path.resolve(__dirname, './src/vue-app/components'),
        // '@api': path.resolve(__dirname, './src/vue-app/api'),
        // '@utils': path.resolve(__dirname, './src/vue-app/utils'),
        // '@common': path.resolve(__dirname, './src/vue-app/common'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: `$env:${env.NODE_ENV};`,
              }
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: 'static/media/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: 'static/fonts/[hash][ext][query]'
          }
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"],
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"],
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: JSON.stringify(agr.mode)
      }),
      new Dotenv({ path: `.env.${env.NODE_ENV}` }),
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({ "process.env.MODE": JSON.stringify(agr.mode) }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "popup.html"),
        filename: "popup.html",
        chunks: ["popup"],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "options.html"),
        filename: "options.html",
        chunks: ["options"],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `manifest/manifest.${env.NODE_ENV}.json`,
            to: "manifest.json",
            force: true,
            transform: function (content, path) {
              return Buffer.from(
                JSON.stringify(
                  {
                    ...JSON.parse(content.toString()),
                    name: "Facebook Ads Check",
                    description: "Facebook Ads Check",
                    version: "1.0.1",
                    version_name: "1.0.1",
                  },
                  null,
                  "\t"
                )
              );
            },
          },
          {
            from: "src/assets/images/",
            to: "assets/images/[name][ext]",
          },
          {
            from: "cors.json",
            to: "cors.json",
          },
        ],
      }),
      new MiniCssExtractPlugin({ filename: "static/css/[name].css" }),
      new VueLoaderPlugin()
    ],
    performance: {
      hints: false,
    },
    devtool: false
  }
};
