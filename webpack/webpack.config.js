import 'dotenv/config';
import { join } from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const sourcePath = join(process.cwd(), 'src');
const outputPath = join(process.cwd(), 'build');
const entryPath = join(sourcePath, 'index.jsx');
const assetsPath = join(sourcePath, 'assets');
const templatePath = join(sourcePath, 'template.html');

export default (env, options) => ({
  mode: 'development',
  devtool: 'source-map',
  entry: ['react-hot-loader/patch', entryPath],
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: outputPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __DEV__: options.mode !== 'production',
    }),
    new HtmlWebpackPlugin({
      template: templatePath,
    }),
    new CopyWebpackPlugin([
      {
        from: assetsPath,
        to: outputPath,
      },
    ]),
  ],
  devServer: {
    hot: true,
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 8080,
    contentBase: assetsPath,
    historyApiFallback: true,
  },
});
