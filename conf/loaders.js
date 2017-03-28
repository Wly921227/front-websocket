var ExtractTextPlugin = require('extract-text-webpack-plugin')

var loaders = [
    // JS
    {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            plugins: [
                'transform-decorators-legacy',
                'react-hot-loader/babel'
            ],   /// 使用decorator写法
            presets: [
                'es2015',
                'stage-2',
                'react'
            ]
        }
    },
    // images
    {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=1000000'   // 单位b
    }
]

if (process.env.NODE_ENV === 'production') {
    // 生产环境css单独打包
    loaders = loaders.concat(loaders, [
        // less
        {
            test: /\.less?$/,
            exclude: /(node_modules)/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
        },
        // css
        {
            test: /\.css?$/,
            exclude: /(node_modules)/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }
    ])
} else {
    // 开发环境css热加载
    loaders = loaders.concat(loaders, [
        // less
        {
            test: /\.less?$/,
            exclude: /(node_modules)/,
            loader: 'style!css!postcss!less',
        },
        // css
        {
            test: /\.css?$/,
            exclude: /(node_modules)/,
            loader: 'style!css!postcss',
        }
    ])
}

module.exports = loaders