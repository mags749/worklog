var webpackMerge = require('webpack-merge');        // Merge multiple config files of Webpack
var commonConfig = require('./webpack.common');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',        // Debugging on the client site browser
    output: {
        path: path.resolve(rootDir, 'dist'),
        publicPath: './',
        filename: '[name].js'
    },
    node: {
        fs: 'empty'
    }
});