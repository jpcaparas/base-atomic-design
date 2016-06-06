/* eslint-disable */
const path              = require('path');
const LiveReloadPlugin  = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');

const PATHS = {
    js: path.join (__dirname, 'resources/assets/js/'),
    sass: path.join (__dirname, 'resources/assets/sass/')
};

const BROWSER_SUPPORT = [
    'Chrome >= 47',
    'Firefox >= 42',
    'Explorer >= 10',
    'Opera >= 12',
    'Safari >= 8',
    'ChromeAndroid >= 47',
    'iOS >= 8'
];

module.exports = [{
    name: 'CSS',
    entry: [
        PATHS.sass + 'app.scss'
    ],
    output: {
        path:     './public/assets/builds',
        filename: 'app.css'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    ['css?-url', 'postcss?parser=postcss-scss']
                ),
                include: PATHS.sass
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new LiveReloadPlugin()
    ],
    postcss: function(webpack) {
        return [
            require('postcss-easy-import')({ addDependencyTo: webpack, prefix: '_', extensions: ['.scss', '.css'] }), // Must be first item in list
            require('postcss-strip-inline-comments'),
            require('postcss-mixins'),
            require('postcss-simple-vars'),
            require('postcss-math'),
            require('postcss-remify'),
            require('precss')({ browsers: BROWSER_SUPPORT }),
            require('postcss-cssnext')({ warnForDuplicates: false, browsers: BROWSER_SUPPORT })
        ];
    }
},
{
    name: 'JavaScript',
    entry: [
        PATHS.js + 'app.js'
    ],
    output: {
        path:     './public/assets/builds',
        filename: 'bundle.js'
    },
    node: "empty",
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'eventEmitter/EventEmitter': 'wolfy87-eventemitter/EventEmitter',
            'get-style-property/get-style-property': 'desandro-get-style-property/get-style-property',
            'matches-selector/matches-selector': 'desandro-matches-selector/matches-selector',
            'classie/classie': 'desandro-classie/classie',
            'get-style-property': 'desandro-get-style-property',
            'matches-selector': 'desandro-matches-selector',
            'classie': 'desandro-classie'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: PATHS.js
            }
        ],
        loaders: [
            {
                test:  /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory',
                include: PATHS.js
            },
            {
                test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(false),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            compress: {
                conditionals: true,
                dead_code: true,
                drop_console: true,
                drop_debugger: true,
                warnings: false
            },
            mangle: {
                props: false,
                vars: true
            },
            sourceMap: false
        })
    ]
}];
