var path = require('path');
module.exports = {
    entry:['./containers/signin.jsx'],
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
    }
}