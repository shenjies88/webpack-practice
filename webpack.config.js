const path = require('path');
//打包模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离打包css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
        },
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css', '.less'], //导入扩展名补全
        modules: [
            path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
            'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
        ],
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'dist')
                        }
                    },
                    'css-loader',
                    'less-loader',
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
