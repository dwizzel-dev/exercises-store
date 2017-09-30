var webpackMerge = require('webpack-merge');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  
  output: {
    path: helpers.root('../server/dev'),
    //publicPath: 'http://localhost:8080/',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    /*
	new ExtractTextPlugin({
		filename: '[name].css'
	})
	*/
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
