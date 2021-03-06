var optimize = false;
var webpack = require('webpack');


module.exports = {
    entry: {
        "static": "./static/webpack.index.js",
        "static/map": "./static/map/webpack.index.js",
    },
    output: {
        path: __dirname,
        filename: "[name]/webpack.bundle-[hash].js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.css$/, use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "sprite-loader", options: { name: "[hash].png", outputPath: "./static/images/", cssImagePath: "/en/images/" } }
            ] },
            { test: /\.png$/, loaders: ["base64-image-loader"] },
            { test: /\.gif$/, loaders: ["base64-image-loader"] },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Mustache: "mustache",
        }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true }),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                    __dirname + "/webpack.stats.json",
                    JSON.stringify(stats.toJson().assetsByChunkName));
            });
        }
    ],
};
