var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');                       // Path resolver

module.exports = {
    entry: {
        'vendor': './vendor.js',
        'app': './main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {                                       // Module loaders of JSX files
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {                                       // Module loaders for CSS file
                test: /\.css?$/,                    
                exclude: path.resolve(__dirname, 'app'),
                loader: 'style-loader!css-loader?root=.'
            },
            {                                       // Module loaders for FONT files
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({   // Optimization plugin for JS files to remove duplicate code
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({                     // Plugin to integrate the generate/entry files in template provided
            template: './index.html'
        }),
        new webpack.ProvidePlugin({                 // Plugin to provide the required Objects on the page without defining in Script
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}