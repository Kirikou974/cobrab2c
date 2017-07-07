var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry:['./client.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/public')
    },

    module: {
        loaders: [
            {
                test: [/\.jsx$/],
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                query:{
                    presets:['react']
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': '"development"'
        }
        })
    ]
}