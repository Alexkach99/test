const webpack = require('webpack');

module.exports = {
	devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
	performance: { hints: false },
	entry: './client/main.js',
	output: {
		path: __dirname + '/public/build/',
		publicPath: 'build/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader?presets[]=es2015&presets[]=react',
				exclude: ['node_modules', 'public']
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!less',
				exclude: ['node_modules', 'public']
			},
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader'],
				exclude: ['node_modules', 'public']
			},
			{
				test: /\.gif$/,
				loader: 'url-loader?limit=10000&mimetype=image/gif'
			},
			{
				test: /\.jpg$/,
				loader: 'url-loader?limit=10000&mimetype=image/jpg'
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=10000&mimetype=image/png'
			},
			{
				test: /\.svg/,
				loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader?presets[]=es2015&presets[]=react',
				exclude: ['node_modules', 'public']
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};