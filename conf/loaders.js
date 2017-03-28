var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

var loaders = [
    // JS
    {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            cacheDirectory: true,
            plugins: [
                'transform-decorators-legacy',
                'react-hot-loader/babel',
                'transform-runtime',
                ['import', {libraryName: 'antd'}]   // 使用antd必须
            ],   // 使用decorator写法
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
            exclude: /(node_modules\/(?!(antd)\/)).*/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
        },
        // css
        {
            test: /\.css?$/,
            exclude: /(node_modules\/(?!(antd)\/)).*/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }
    ])
} else {
    // 开发环境css热加载
    loaders = loaders.concat(loaders, [
        // less
        {
            test: /\.less?$/,
            exclude: /(node_modules\/(?!(antd|test)\/)).*/,  // 正则排除antd || test 可匹配其它目录
            loader: 'style!css!postcss!less',
        },
        // css
        {
            test: /\.css?$/,
            exclude: /(node_modules\/(?!(antd)\/)).*/,
            loader: 'style!css!postcss',
        }
    ])
}

module.exports = loaders