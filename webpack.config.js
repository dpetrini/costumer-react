const path = require('path');

module.exports = {
  devtool: 'inline-sourcemap',
  entry: './js/source/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('build')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      { 
        test: /\.css$/, 
        loaders: [
          'style-loader', 'css-loader'
        ]
      },
    ]
  }
};
