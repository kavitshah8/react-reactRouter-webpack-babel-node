var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var { resolve } = require('path');

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
			path: options.devServer ? resolve( __dirname, 'public', 'js') : 'public',
			filename: '[name]-[chunkhash].js',
			publicPath: '',
		},
		module: {
            noParse: /resolve(__dirname, 'node_modules')/,
			rules: [
				{ test: /\.js|jsx$/, exclude: /node_modules/, use: ['react-hot-loader', 'babel-loader'] },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
				{ test: /\.json$/, use: 'json-loader' },
                { test: /\.(jpg|png|svg)$/, exclude: /(node_modules)/, use: 'url-loader?limit=8192&name=./img/[hash].[ext]'}
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
                // hash: true,
                template: resolve( __dirname, 'src', 'index.tpl.html'),
                chunks: ['commons', 'app']
            }),

            new CopyWebpackPlugin([{
                from: resolve(__dirname, 'src', 'assets', 'images'),
                to: 'images'
            }])
		].concat(plugins),
	    devtool: options.devtool
	};

    return config;
};
