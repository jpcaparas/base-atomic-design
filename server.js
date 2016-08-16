/*
    Webpack Dev Server
    - Serves JavaScript assets
 */
const config           = require('./webpack.config');
const cors             = require('cors');
const path             = require('path');
const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const CONTENT_BASE = config[0].output.path;
const PORT = 3000;
const PUBLIC_PATH = config[0].output.publicPath;


let app = new WebpackDevServer(webpack(config), {
    contentBase: CONTENT_BASE,
    historyApiFallback: true,
    hot: true,
    publicPath: PUBLIC_PATH
});


// Allow CORS
app.use(cors());


// Fix local assets not being served up
app.use('/assets/*', function(req, res) {
    res.sendFile(path.join(__dirname, './public', req.originalUrl)); // eslint-disable-line
});


app.listen(PORT, 'localhost', function(error) {
    if (error) {
        console.log(error); // eslint-disable-line
    }

    console.log('Listening at localhost:', PORT); // eslint-disable-line
});
