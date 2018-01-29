var webpack = require('webpack');
var webpackMerge = require('webpack-merge');    // Merge multiple config files of Webpack 
var commonConfig = require('./webpack.common');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: path.resolve(rootDir, 'dist'),
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    node: {
        fs: 'empty'
    },
    plugins: [                                  // Plugin to minify the files
        new webpack.optimize.UglifyJsPlugin()
    ]
});