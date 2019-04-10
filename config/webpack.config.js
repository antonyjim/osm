const path = require('path')

const BUILD_DIR = path.resolve(__dirname, '..', 'public/scripts/bundles/')
const APP_DIR = path.resolve(__dirname, '..', 'src/client/view')
const STYLE_DIR = path.resolve(__dirname, '..', 'src/client/styles')

const config = {
    entry: path.resolve(APP_DIR, 'index.tsx'),
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        globalObject: 'self',
        path: BUILD_DIR,
        publicPath: '/public/scripts/bundles/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.js/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?/,
                include: APP_DIR,
                loader: require.resolve('awesome-typescript-loader')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                include: STYLE_DIR,
                use: [
                    'style-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    externals: {
        jquery: 'jQuery',
        $: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
        bootstrap: 'bootstrap',
        'monaco-editor': 'monaco'
    }
}

module.exports = config