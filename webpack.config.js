const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  context: path.resolve(__dirname, 'src'),
  mode: process.env.MODE,
  entry: './index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    port: 4200,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [new ESLintPlugin(),
            new HtmlWebpackPlugin({ template: './index.html' }),
            new MiniCssExtractPlugin({ filename: './style.css' }), 
            new CopyPlugin({
              patterns: [
                {
                  from: path.resolve(__dirname, 'src/assets/img'),
                  to:   path.resolve(__dirname, 'dist/'),
                },
                {
                  from: path.resolve(__dirname, 'src/assets/img/flowers'),
                  to:   path.resolve(__dirname, 'dist/'),
                }
  ],
  }),],
};