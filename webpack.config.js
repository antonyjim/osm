const path = require('path')

let BUILD_DIR = path.resolve(__dirname, 'public/scripts/bundles/')
let APP_DIR = path.resolve(__dirname, 'src/client/view')
let STYLE_DIR = path.resolve(__dirname, 'src/client/styles')

let config = {
    watch: true,
    entry: {
        "main": APP_DIR + '/index.tsx',
        // "monaco.editor": 'monaco-editor/esm/vs/editor/editor.api.js',
        // "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
        // "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
        // "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
        // "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
        // "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        disableHostCheck: true
    },
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
                loader: 'awesome-typescript-loader'
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
                    'css-loader',
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
        bootstrap: 'bootstrap'
    }
}

module.exports = config