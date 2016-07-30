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
		}, {
			test: /\.js$/, loader: 'babel', exclude: /node_modules/,
		}],
	},
	vue: {
		loaders: {
			css: ExtractTextPlugin.extract('css'),
		}
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime'],
	},
	plugins: [
		new ExtractTextPlugin('css/userpanel.bundle.css'),
	],
};
