const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    integrity: true,
    parallel: true,
    assetsDir: 'static',
    css: {
        extract: false
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
}