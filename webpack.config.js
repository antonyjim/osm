const webpack = require('webpack')
const path = require('path')

let BUILD_DIR = path.resolve(__dirname, 'public')
let APP_DIR = path.resolve(__dirname, 'src/client/view')
let STYLE_DIR = path.resolve(__dirname, 'src/client/styles')

let config = {
    watch: true,
    entry: APP_DIR + '/index.jsx',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        disableHostCheck: true
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
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
    }
}

module.exports = config