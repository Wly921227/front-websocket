var path = require('path')
var loaders = require('./loaders')

var webpack = require('webpack')

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/app.js'),
        vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react']
    },
    resolve: {
        alias: {
            'common': path.resolve(__dirname, '../src/common'),
            'images': path.resolve(__dirname, '../src/images'),
            'pages': path.resolve(__dirname, '../src/pages')
        },
        extensions: ['', '.js', '.json', '.less', '.css']
    },
    module: {
        loaders: loaders,
    },
    postcss: function () {
        return [
            require('precss'),
            require('autoprefixer')({
                browsers: ['last 2 version', 'ie >= 8'],
                remove: false
            })
        ];
    }
}