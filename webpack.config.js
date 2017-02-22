const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devBuild = process.argv.indexOf('-p') === -1;
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
const assetsPath = path.join(__dirname, 'src', 'assets');

if (process.argv.indexOf('-p') === -1) {
  process.env.NODE_ENV = 'development';
} else {
  process.env.NODE_ENV = 'production';
}

module.exports = {
  context: path.join(__dirname, 'src', '_webpack'),

  entry: {
    app: ["javascripts/index.js", "stylesheets/style.scss"],
  },

  output: {
    path: assetsPath,
    filename: 'app.js',
  },

  resolve: {
    extensions: ['', '.js', '.scss'],
    root: path.join(__dirname, 'src', '_webpack'),
    alias: {
      images: path.resolve(__dirname, 'src', 'assets', 'images'),
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass'),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?name=./images/[hash].[ext]'
      },
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 3 versions']
    })
  ],
}

const config = module.exports

console.log('Webpack ' + process.env.NODE_ENV + ' build for Jekyll'); // eslint-disable-line no-console

if (devBuild) {
  if (isDevServer) {
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
    config.entry.app.unshift("webpack/hot/only-dev-server");
    config.output.publicPath = "http://localhost:8080/";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
  }
  config.devtool = 'eval-source-map';
} else {
  config.plugins.push(new webpack.optimize.DedupePlugin());
}
