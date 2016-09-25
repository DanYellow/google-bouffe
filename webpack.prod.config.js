var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  node: {
    fs: "empty"
  },
  entry: './dev/assets/scripts/index.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'index.js',
    publicPath: '/google-bouffe/scripts/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
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
