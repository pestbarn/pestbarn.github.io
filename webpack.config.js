const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        entry: [
            './app/Index.js'
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
            ]
        },
        output: {
            filename: 'main.js',
            path: __dirname + '/bin/js'
        }
    },
    {
        entry: [
            './src/postcss/base.postcss'
        ],
        module: {
            loaders: [
                {
                    test: /\.postcss$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract({
                        use: 'css-loader?importLoaders=1!resolve-url-loader!postcss-loader?sourceMap=inline'
                    })
                }, {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file-loader?emitFile=false&name=[path][name].[ext]'
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('./main.css'),
        ],
        output: {
            filename: 'main.css',
            path: __dirname + '/bin/css'
        }
    }
];
