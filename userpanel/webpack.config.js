"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './userpanel.js',
	output: {
		path: path.resolve(__dirname, '..', 'public', ''),
		filename: 'js/userpanel.bundle.js',
	},
	module: {
		loaders: [{
			test: /\.vue$/, loader: 'vue',
		}],
	},
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract('css'),
		}
	},
	plugins: [
		new ExtractTextPlugin('css/userpanel.css'),
	],
};
