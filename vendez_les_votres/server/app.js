const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routers
const indexRouter = require('./routes/index.route');
const accessRouter = require('./routes/access.route');
const userRouter = require('./routes/user.route');
// middlewares
const errorMiddleware = require('./middlewares/error.middleware');
// connection to data base
const dbConnection = require('./controllers/db.controller.js');
// create app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// install middlewares and routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/access', accessRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);
module.exports = app;
