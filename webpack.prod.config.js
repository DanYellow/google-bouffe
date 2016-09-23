var path = require('path')
var webpack = require('webpack')

// http://danyellow.ilotreseau.net/google-bouffe/assets/scripts/488d5cc145299ba07b75495100419ee6.ttf
// http://danyellow.ilotreseau.net/assets/scripts/b32acea6fd3c228b5059042c7ad21c55.ttf
module.exports = {
  devtool: 'cheap-module-source-map',
  node: {
    fs: "empty"
  },
  entry: './dev/assets/scripts/app.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'app.js',
    publicPath: '/google-bouffe/assets/scripts/'
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
      { test: /\.css$/, 
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  }
}
