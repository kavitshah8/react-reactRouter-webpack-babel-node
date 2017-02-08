const validator = require('webpack-validator');
const path = require('path');
var webpack = require('webpack');

const config = {

	entry: [
	    'webpack-dev-server/client?https://localhost:3443',
        'webpack/hot/dev-server',
		path.join( __dirname, 'src/Router.jsx')
	],
	output: {
		path: path.join( __dirname, 'public/assets/js'),
		filename: 'app.js',
		publicPath: 'assets/js/',		
	},

	module: {
		loaders: [
			{
				test: /\.js|jsx$/, loaders: ['react-hot', 'babel'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/, loaders: ['style', 'css']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		inline: true,
		hot: true,
		contentBase: './public'
	}
};

module.exports = validator(config);

