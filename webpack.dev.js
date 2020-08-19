const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'eval-source-map',
	mode: 'development',
	devServer: {
		contentBase: 'web/static/',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		hot: true,
		liveReload: false,
		compress: true,
		publicPath: 'http://localhost/dist/',
		overlay: true,
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/web/static/dist',
		publicPath: 'http://localhost:8080/dist/',
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
});
