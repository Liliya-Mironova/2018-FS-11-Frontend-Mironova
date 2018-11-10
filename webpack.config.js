const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourceRoot = path.resolve(__dirname, 'src');

module.exports = {
	entry: './src/app/create/index.js',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name]/style.css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/app/create/index.html'
		})
	],
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /shadow\.css$/,
				include: sourceRoot,
				 use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /index\.css$/,
				include: sourceRoot,
				use: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	}
};
