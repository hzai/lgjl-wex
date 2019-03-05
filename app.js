
'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var enrouten = require('express-enrouten');
var RedisStore = require('connect-redis')(session);
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var config = require('config');
var Logger = require('./lib/logger');
var Filter = require('./lib/filter');
var utilLibrary = require('./lib/utilLibrary');
var tagLibrary = require('./lib/tagLibrary');
var logger = Logger.getLogger('index');

var app = express();

app.enable('trust proxy');
app.use(Logger.getExpressLogger());
app.use(express.static('public/static'));
app.use(cookieParser());
app.use(upload.array('filedatas'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * 模板渲染的时候，全局的模型对象
 */
var loginbase = config.get('loginConfig.host');
if(config.get('loginConfig.port') != 80){
    loginbase = loginbase + ':' + config.get('loginConfig.port');
}
app.locals.g_base = {
    sitename: config.get('siteConfig.name'),
    sitebase: config.get('siteConfig.host'),
    apibase: config.get('hostConfig'),
    loginbase: loginbase
};
app.locals.g_webui = config.get('webui');

app.locals.tagjs = tagLibrary.tagJs;
app.locals.tagcss = tagLibrary.tagCss;

app.use(session({
    name: 'nodesess',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false
    },
    store: new RedisStore(config.get('sessionConfig.redis'))
}));

var viewCache = process.env.NODE_ENV == 'production' ? true : config.get('cacheConfig.viewCache');
var adaro = require('adaro');
app.engine('dust', adaro.dust({ cache: viewCache, whitespace: true , helpers: ['dustjs-helpers']}));
app.set('views', './public/templates');
app.set('view engine', 'dust');


app.use(Filter(['checklogin'], {
    exclude: ['/wxhandler', '/wxapi', '/login', '/auth'],
    tokendir: ['/upload'],
    required: true
}),enrouten({
    directory: 'controllers'
}));

// app.use(function(req, res, next){
//     res.render('errors/404', {});
// });

process.on('uncaughtException', function(err) {
    logger.error('Error caught in uncaughtException event:', err);
    console.error('Error caught in uncaughtException event:', err);
});

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || config.get('server.port');
console.log('env : ', env);
console.log('port: ', port);
console.log('viewCache: ', viewCache);
app.listen(port);
