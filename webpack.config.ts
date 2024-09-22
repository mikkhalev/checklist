const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin"); // импортируем модуль для работы с путями

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "build.js",
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader", //MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        })
    ],
    devServer: {
        open: true, // автоматически открывать приложение в браузере
        port: 3000, // можно указать желаемый порт
        hot: true, // поддержка горячей перезагрузки (по желанию)
    },
    devtool: "inline-source-map"
}