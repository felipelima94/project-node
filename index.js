var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const userServiceProxy = httpProxy('http://localhost:3000/index.html');

// Proxy request
let count = 1;
app.get('/', (req, res, next) => {
  setTimeout(() => { console.log('log ', count++)}, 3000)
  userServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);