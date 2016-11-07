var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
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
		entry: {
            app: addEntryPoint('./src/Router.jsx'),
            vendor: ['react', 'react-router', 'react-dom']
        },
        output: {
			path: options.devServer ? path.join( __dirname, 'public', 'js') : 'public',
			filename: '[name]-[chunkhash].js',
			publicPath: '',
		},
		module: {
			loaders: [
				{ test: /\.js|jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
				{ test: /\.css$/, loaders: ['style', 'css'] }
			]
		},
		plugins: [
            new CommonsChunkPlugin({
                name: 'commons',
                filename: 'commons-[hash].js',
                chunks: ['vendor', 'app']
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                hash: true,
                template: path.join( __dirname, 'src', 'index.tpl.html'),
                chunks: ['commons', 'app']
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
