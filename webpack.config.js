'use strict';

var webpack = require("webpack");
var path = require('path');
// http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractor = new ExtractTextPlugin({
    filename:'/[name].css',
    disable:true//是否禁用插件
});

module.exports = {
    context: __dirname + "/src",
    entry: {
        avalon2ui: "./avalon2ui.js",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js",
        libraryTarget: 'umd',
        library: 'avalon'
    },
    devServer: {
        contentBase: __dirname + "/src",  // New
        port: 8090,
        inline: true //实时刷新
    },
    module:{
          rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader'],
                })
            }
        ],
    },
    plugins: [
        cssExtractor
    ]
};