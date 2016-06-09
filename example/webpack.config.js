var path = require('path')
var webpack = require('webpack')

var reduxModalSrc = path.resolve(__dirname, '../src')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: '.',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [ __dirname, reduxModalSrc ],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },
  resolve: {
    alias: { 'redux-modal': reduxModalSrc }
  }
}
