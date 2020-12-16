var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/import');
var exportRouter = require('./controllers/export');
var listRouter = require('./controllers/list');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/import', indexRouter);
app.use('/list', listRouter);
app.use('/export', exportRouter);

module.exports = app;
