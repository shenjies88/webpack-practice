const path = require('path');
//打包模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离打包css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        //导入扩展名补全
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        //解析插件
        rules: [
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'dist')
                        }
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.less$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.jsx?/i, // 支持 js 和 jsx
                include: [
                    path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ],
    }
};
