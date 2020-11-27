const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }
        ]
    },
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'src/utils/'),
            Config: path.resolve(__dirname, 'src/config/'),
            Constants: path.resolve(__dirname, 'src/constants/'),
            Enum: path.resolve(__dirname, 'src/enum/'),
            Models: path.resolve(__dirname, 'src/models/'),
        }
    }
};