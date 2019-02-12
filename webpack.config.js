const webpack = require('webpack')
const path = require('path')

let BUILD_DIR = path.resolve(__dirname, 'public/scripts/')
let APP_DIR = path.resolve(__dirname, 'src/client/view')
let STYLE_DIR = path.resolve(__dirname, 'src/client/styles')

let config = {
    watch: true,
    entry: {
        main: APP_DIR + '/index.jsx',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        disableHostCheck: true
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/public/scripts/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }, 
            {
                test: /\.scss$/,
                include: STYLE_DIR,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

module.exports = config