var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');

var app = express();

app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var port = process.env.PORT || '3001';

app.listen(port, () => console.log(`listening on port ${port}!`))
