const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("copy images", function () {
      fse.copySync("./assets/images/", "./dist/assets/images/")
      fse.copySync("./assets/vendors/", "./dist/assets/vendors/")
    })
  }
}

// let cssConfig = {
//   test: /\.css$/i,
//   use: ["css-loader", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }],
// }

let cssConfig = {
  test: /\.(scss|sass|less|css)$/,
  use: ["css-loader", "sass-loader"],
}

let pages = fse
  .readdirSync(".")
  .filter(function (file) {
    return file.endsWith(".html")
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./${page}`,
    })
  })

let config = {
  entry: "./assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [cssConfig],
  },
}

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader")
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, ""),
  }
  config.devServer = {
    watchFiles: ["./**/*.html"],
    static: path.resolve(__dirname, ""),
    hot: true,
    port: 3000,
  }
  config.mode = "development"
}

if (currentTask == "build") {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  })

  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    // filename: "bundled.js",
    filename: "assets/scripts/[name].[chunkhash].js",
    chunkFilename: "assets/scripts/[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  }
  config.mode = "production"
  config.optimization = {
    splitChunks: { chunks: "all", minSize: 1000 },
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  }

  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "assets/styles/styles.[chunkhash].css" }), new RunAfterCompile())
}

module.exports = config
