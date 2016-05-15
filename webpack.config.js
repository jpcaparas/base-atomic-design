const path              = require('path');
const LiveReloadPlugin  = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    app: path.join (__dirname, 'resources/assets/')
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
    name: 'JavaScript',
    entry: [
        PATHS.app + 'js/app.js'
    ],
    output: {
        path:     './public/assets/builds',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: PATHS.app
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: PATHS.app
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}, {
    name: 'CSS',
    entry: [
        PATHS.app + 'sass/app.scss'
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
                include: PATHS.app + 'sass/'
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
            require('precss'),
            require('autoprefixer')({ browsers: BROWSER_SUPPORT }),
            require('postcss-cssnext')({ warnForDuplicates: false }),
            require('postcss-remify'),
            require('postcss-discard-duplicates')
        ];
    },
    stylelint: {
        configFile: path.join(__dirname, './.stylelintrc')
    }
}];
