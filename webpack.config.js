'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const timestamp = require('time-stamp');
const packageJson = require('./package.json');
const config = require('./config.json');

const isDev = config.environment;

module.exports = {
    entry: config.dev_dir + 'app.js',
    output: {
        path: config.dist_dir,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(bin|node_modules|bower_components|grunt|gulp|bower)/,
            loader: 'babel',
            query: {
                presets: ['env'],
                babelrc: false
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEBUG     : JSON.stringify(true),
            __NAME      : JSON.stringify(packageJson.name),
            __DESC      : JSON.stringify(packageJson.description),
            __VERSION   : JSON.stringify(packageJson.version),
            __TIMESTAMP : JSON.stringify(timestamp('YYYY/MM/DD HH:mm:ss:ms'))
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: config.dev_dir + 'index.html'
        }),
        new webpack.ProvidePlugin({
            Logger   : config.dev_dir + 'libs/Logger'
        })
    ]
}