const path = require('path');
const webpack = require("webpack");
//打包模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离打包css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//定义环境变量
const DefinePlugin = webpack.DefinePlugin;

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
        new HtmlWebpackPlugin({
            minify: { // 压缩 HTML 的配置
                minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
                minifyJS: true // 压缩 HTML 中出现的 JS 代码
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new DefinePlugin({
            PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
            VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
            BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
            TWO: '1+1', // const TWO = 1 + 1,
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
            }
        }),
    ],
    module: {
        noParse: /jquery|lodash/, // 不需要解析的依赖
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
    },
    devServer: {
        hot: true
    }
};
