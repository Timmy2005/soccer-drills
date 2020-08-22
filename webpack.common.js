const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		app: './web/static/src/app/main.js',
		login: './web/static/src/login/main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: [
					'file-loader',
				],
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	watch: true
};
