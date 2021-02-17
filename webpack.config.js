const webpack = require ('webpack');
const path = require('path');
const dotenv = require('dotenv');
module.exports = () => {
	const env = dotenv.config().parsed;
	//
	 const envKeys = Object.keys(env).reduce((prev, next) => {
	 	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	 	return prev;
	 }, {});
	return {
		plugins: [
			 new webpack.DefinePlugin(envKeys)
		],
		entry: path.join(__dirname, '/src/index.js'),
		watch: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 500
		},
		output: {
			filename: 'child.js',
			path: path.join(__dirname, "/public")
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: "babel-loader",
					options: {
						babelrc: true
					}
				},
				{
					test: /\.[sac]+ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				},
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
};
