var path = require('path');
var webpack = require('webpack');

// https://davidwalsh.name/css-flip

module.exports = {
  devtool: 'source-map',
  node: {
    fs: "empty"
  },
  entry: [
    'webpack-hot-middleware/client',
    './dev/assets/scripts/app.js',
  ],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'app.js',
    publicPath: '/assets/scripts/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname },
      { test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8192', include: __dirname },
      { test: /\.json$/, loader: 'json!json-loader', include: __dirname },
      { test: /\.css$/, 
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  }
}
