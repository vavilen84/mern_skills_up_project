const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {

    const uploadsFolder = env.docker ? "/uploads" : path.join(__dirname, '../uploads');

    console.log(env.docker);
    console.log(uploadsFolder);

    return {
        entry: './src/index.js',
        watch: true,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[hash].bundle.js',
            publicPath: '/',
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        devServer: {
            historyApiFallback: true,
            static: [
                {
                    directory: path.join(__dirname, 'public'),
                },
                {
                    directory: uploadsFolder,
                }
            ],
            compress: true,
            port: 9001,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new CleanWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /(\.jpeg|\.svg|\.png|\.css)$/,
                    use: [{loader: 'file-loader'}]
                },
                {
                    test: /(\.css)$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                }
            ]
        }
    }
};