import webpack from 'webpack';

const staticSettings: webpack.Configuration = {
  cache: true,
  devtool: false,
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc.yml'
        }
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: __dirname,
    library: 'jsonresume-theme-japanese-cv-style',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  target: 'node'
};

export default (source: webpack.Configuration): webpack.Configuration => ({
  ...source,
  ...staticSettings
});
