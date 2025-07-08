const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/cliente/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [ 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/cliente/index.html'
        }),

            new htmlWebpackPlugin({
            filename: 'galeria.html',
            template: './src/cliente/galeria.html'
        }),
            new htmlWebpackPlugin({
            filename: 'biblioteca.html',
            template: './src/cliente/biblioteca.html'
            }),
             new htmlWebpackPlugin({
            filename: 'auditorio.html',
            template: './src/cliente/auditorio.html'
            }),
            new htmlWebpackPlugin({
            filename: 'quiz.html',
            template: './src/cliente/quiz.html'
            }),
    ]
};