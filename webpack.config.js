/* eslint-disable */

/*
    Includes
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const LiveReloadPlugin   = require('webpack-livereload-plugin');
const ManifestPlugin     = require('webpack-manifest-plugin');
const path               = require('path');
const webpack            = require('webpack');


/*
    Environment
 */
let ENV = 'development',
    REACT = false;

if (process.argv.indexOf('--production') > 0) {
    ENV = 'production';
}



/*
    Config
 */
const BROWSER_SUPPORT = [
    'Chrome >= 53',
    'ChromeAndroid >= 53',
    'Safari >= 9',
    'iOS >= 9',
    'Firefox >= 48',
    'Explorer >= 11',
    'Opera >= 40'
];

const PATHS = {
    devserver: 'http://localhost:3000/static/',
    devurl: 'http://localhost:3000',
    dist: path.join(__dirname, 'public/assets/builds/'),
    js: path.join (__dirname, 'client/js/'),
    sass: path.join (__dirname, 'client/sass/'),
    stylelint: path.join(__dirname, '.stylelintrc')
};

const JS_LIBRARY_ALIASES = {
    // Fill in as needed
};

const CSS_FILES = {
    entry: {
        'app': PATHS.sass + 'app.scss'
    },
    output: {
        path: PATHS.dist,
        filename: (ENV === 'development') ? '[name].css' : '[name].[chunkhash].css',
        publicPath: PATHS.devserver
    }
};


/*
    Javascript bundle
 */
let bundle = PATHS.js + 'app.js';

if (ENV === 'development') {
    bundle = [
        'webpack-dev-server/client?' + PATHS.devurl,
        'webpack/hot/only-dev-server',
        PATHS.js + 'app.js'
    ];
}

const JS_FILES = {
    entry: {
        'polyfill': 'babel-polyfill',
        'bundle': bundle
    },
    output: {
        path: PATHS.dist,
        filename: (ENV === 'development') ? '[name].js' : '[name].[chunkhash].js',
        publicPath: PATHS.devserver
    }
};


/*
    Manifest cache
 */
let cache = {};


/*
    SCSS
 */
let css = {
    name: 'CSS',
    entry: CSS_FILES.entry,
    output: CSS_FILES.output,
    module: {
        loaders: [
            {
                test: /\.scss$/,
                include: PATHS.sass,
                loader: ExtractTextPlugin.extract(
                    [
                        'css?-url&sourceMap',
                        'postcss?parser=postcss-scss'
                    ]
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(CSS_FILES.output.filename, { allChunks: true })
    ],
    postcss: function(webpack) {
        let modules = [
            require('postcss-easy-import')({ addDependencyTo: webpack, prefix: '_', extensions: ['.scss', '.css'] }), // Must be first item in list
            require('postcss-strip-inline-comments'),
            require('postcss-mixins'),
            require('postcss-simple-vars'),
            require('postcss-math'),
            require('postcss-remify'),
            require('precss')({ browsers: BROWSER_SUPPORT }),
            require('postcss-cssnext')({ warnForDuplicates: false, browsers: BROWSER_SUPPORT })
        ];

        if (ENV === 'production') {
            modules.push(require('cssnano')({
                calc: true,
                colormin: true,
                convertValues: true,
                core: true,
                discardComments: { removeAll: true },
                discardDuplicates: true,
                discardEmpty: true,
                filterOptimiser: true,
                filterPlugins: false,
                functionOptimiser: true,
                mergeLonghand: true
            }));
        }

        return modules;
    }
};

if (ENV === 'production') {
    css.plugins.push(new ManifestPlugin({ cache: cache }));
}

if (ENV === 'development') {
    css.devtool = '#source-map';

    css.module.preLoaders = [
        {
            test: /\.scss$/,
            loader: 'stylelint',
            include: PATHS.sass
        }
    ];

    css.plugins.push(new LiveReloadPlugin());
    css.plugins.push(new webpack.HotModuleReplacementPlugin());
    css.plugins.push(new webpack.NoErrorsPlugin());

    css.stylelint = {
        configFile: PATHS.stylelint
    };
}


/*
    JS
 */
let js = {
    name: 'JavaScript',
    entry: JS_FILES.entry,
    output: JS_FILES.output,
    node: 'empty',
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ],
        alias: JS_LIBRARY_ALIASES
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: PATHS.js
            }
        ],
        loaders: [
            {
                test:  /\.jsx?$/,
                loader: (ENV === 'development' && REACT) ? 'react-hot!babel-loader?cacheDirectory' : 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
                include: PATHS.js
            },
            {
                test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([PATHS.dist]),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
    ]
};

if (ENV === 'development') {
    js.devtool = '#source-map';

    js.plugins.push(new webpack.HotModuleReplacementPlugin());
    js.plugins.push(new webpack.NoErrorsPlugin());
    js.plugins.push(new webpack.DefinePlugin({
        "process.env.RUN_ENV": JSON.stringify("browser")
    }));
}

if (ENV === 'production') {
    js.plugins.push(new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.RUN_ENV": JSON.stringify("browser")
    }));

    js.plugins.push(new ManifestPlugin({ cache: cache }));
    js.plugins.push(new webpack.optimize.DedupePlugin());
    js.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(false));
    js.plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
            conditionals: true,
            dead_code: true,
            drop_console: true,
            drop_debugger: true,
            warnings: false
        },
        output: {
            comments: false,
        },
        mangle: {
            props: false,
            vars: true
        },
        sourceMap: false
    }));
}


/*
    Webpack export
 */
module.exports = [css, js];
