var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
const dbConfig = require('./database.config');
const mongoose = require('mongoose');
const engine = require('ejs-blocks');


var usersRouter = require('./routes/users');

var app = express();
const port = 3000 || process.env.port;

// connect to the database using mongoose
mongoose.connect(dbConfig.url).then(() => console.log('Database Connected Successfully.')).catch((e) => {
  console.log("Cannot Connect To Database");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



// view engine setup
app.set('views', 'views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', usersRouter);

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

app.listen(port, () => {
  console.log(`App running on port ${port} visit http://127.0.0.1:${port}`);
});

module.exports = app;
