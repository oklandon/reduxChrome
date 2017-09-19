var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = {
    entry: {
        content: './src/content/content.js',
        content2: './src/content/content2.js',
        background: './src/background/background.js'
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },

    plugins: [
        new GitRevisionPlugin({gitWorkTree: __dirname+"/."}),
        // This plugin is new with webpack 3, and causes very poor performance while on watch mode
        // so I am commenting it out until webpack updates and patches start coming in:
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'TweenMax': 'gsap',
            'window.TweenMax': 'gsap',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
        })
    ],

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=800'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.json?$/,
                exclude: /node_modules/,
                use: 'json-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'html-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            TweenMax: './node_modules/gsap',
        },
    }
};
