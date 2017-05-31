const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./src/routes/index');
const users = require('./src/routes/users');
const login = require('./src/routes/login');
const posts = require('./src/routes/posts');
const register = require('./src/routes/register');
const admin = require('./src/routes/admin');
const comment = require('./src/routes/comments');
const reply = require('./src/routes/reply');

const monk = require('monk');
const debug = require('debug')('untitled:server');
const http = require('http');
const config = require('./config');
const mongoose = require("mongoose");


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', users);
app.use('/login', login);
app.use('/posts', posts);
app.use('/register', register);
app.use('/admin', admin);
app.use('/comment', comment);
app.use('/reply', reply);

const swagger = require("swagger-node-express");
const subpath = express();

app.use("/", subpath);

app.use(express.static('dist'));

swagger.setAppHandler(subpath);

swagger.setApiInfo({
    title: "Wykop2 Api",
    description: "API to do manage Wykop2 functionality",
    termsOfServiceUrl: "",
    contact: "Krzysztof Misiak",
    license: "",
    licenseUrl: ""
});
subpath.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');

let domain = 'localhost';
const applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});


let port = normalizePort(config.port || '8080');
app.set('port', port);

const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
app.server = server;
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;
