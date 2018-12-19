const path = require('path');
const config = {
  entry: ['babel-polyfill', __dirname + '/react/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/js/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
