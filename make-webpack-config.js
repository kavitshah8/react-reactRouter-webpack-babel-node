var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var validator = require('webpack-validator');

module.exports = function (options) {
	var loaders = [],
		plugins = [];

	if (options.hotReload) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	function addEntryPoint(entryPoint) {
		var entry = ['babel-polyfill', entryPoint];
		if (options.hotReload) {
			entry = [
                'webpack-dev-server/client?http://localhost:3443',
                'webpack/hot/dev-server'
			].concat(entry);
		}
		return entry;
	}

	var config = {
		entry: addEntryPoint('./src/Router.jsx'),
		output: {
			path: options.devServer ? path.join( __dirname, 'public', 'js') : 'public',
			filename: 'app.js',
			publicPath: '',
		},
		module: {
			loaders: [
				{ test: /\.js|jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
				{ test: /\.css$/, loaders: ['style', 'css'] }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join( __dirname, 'src', 'index.tpl.html')
            }),
			new CopyWebpackPlugin([{
                from: path.join(__dirname, 'src', 'assets', 'images'),
                to: 'images'
            }])
		].concat(plugins),
	    devtool: options.devtool,
	    debug: options.debug
	};

	return validator(config);
};
