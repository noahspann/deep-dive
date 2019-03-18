const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const app = express();

// const db = require('../db/index.js')
const config = require('../knexfile')['production'];
const knex = require('knex')(config)
const sql = knex('test table').then((result) => {
  console.log('successful open connection to hosted database')
}).catch((err) => {
  console.log('err:', err)

})
// console.log(sql)


// open up CORS 
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));

// You can place your routes here, feel free to refactor:
const { example } = require('./routes');
app.use('/api/example', example)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;