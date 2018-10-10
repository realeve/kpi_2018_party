var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let imgLoaderOption = {
    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
    copy: true,
    quality: 75
};

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
        symlinks: false
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },
            {
                test: /\.(svg|webp)(\?.*)?$/,
                loaders: [
                    `file-loader?name=${utils.assetsPath('img/[name].[hash:7].[ext]')}`,
                    `webp-loader?{quality: 75,name:${utils.assetsPath('img/[name].[hash:7].[ext]')}`
                ]
            },
            {
                test: /\.(jpe?g)(\?.*)?$/,
                loader: 'image-webp-loader',
                options: Object.assign({}, imgLoaderOption, {
                    requestType: 'jpg'
                })
            },
            {
                test: /\.(png)(\?.*)?$/,
                loader: 'image-webp-loader',
                options: Object.assign({}, imgLoaderOption, {
                    requestType: 'png'
                })
            },
            {
                test: /\.(gif)(\?.*)?$/,
                loader: 'image-webp-loader',
                options: Object.assign({}, imgLoaderOption, {
                    requestType: 'gif'
                })
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}