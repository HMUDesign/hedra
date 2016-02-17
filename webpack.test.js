var webpack = require('webpack');
var path = require('path');

module.exports = {
	target: 'web',
	devtool: 'source-map',
	
	externals: {
		three: 'THREE',
		tween: 'TWEEN',
	},
	
	entry:  './test/Spec.jsx',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	
	module: {
		loaders: [
			{
				test: /Spec\.jsx?$/,
				loader: 'mocha',
			},
			{
				test: /\.jsx$/,
				loader: 'babel',
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
			},
			{
				test: /\.glsl$/,
				loader: 'hedra/loader-webpack-glsl',
			},
		],
	},
	
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'node_modules' ],
	},
	
	stats: {
		colors: true,
	},
};
