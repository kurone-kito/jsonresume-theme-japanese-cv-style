import ESLintPlugin from 'eslint-webpack-plugin';
import type { Configuration } from 'webpack';
import packageJson from './package.json';

export default <Configuration>{
  cache: true,
  devtool: false,
  entry: './src/index.ts',
  externals: Object.keys(packageJson.dependencies || {}),
  mode: 'production',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.pug$/, use: 'pug-loader' },
    ],
  },
  output: {
    filename: 'index.js',
    hashFunction: 'xxhash64', // Solution to Error 0308010C on Node.js 17 + Webpack 5
    library: 'jsonresume-theme-japanese-cv-style',
    libraryTarget: 'umd',
    path: __dirname,
  },
  plugins: [new ESLintPlugin({})],
  resolve: { extensions: ['.js', '.json', '.ts'] },
  target: 'node',
};
