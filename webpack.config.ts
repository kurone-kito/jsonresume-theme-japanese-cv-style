import ESLintPlugin from 'eslint-webpack-plugin';
import type webpack from 'webpack';
import packageJson from './package.json';

export default <webpack.Configuration>{
  cache: true,
  devtool: false,
  entry: './src/index.ts',
  externals: Object.keys(packageJson.dependencies || {}),
  mode: 'production',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.pug$/, use: 'pug-loader' },
    ],
  },
  output: {
    filename: 'index.js',
    path: __dirname,
    library: 'jsonresume-theme-japanese-cv-style',
    libraryTarget: 'umd',
  },
  plugins: [new ESLintPlugin({})],
  resolve: { extensions: ['.js', '.json', '.ts'] },
  target: 'node',
};
