const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
			}),
		],
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/web/static/dist',
		publicPath: '/static/dist/',
	},
});
