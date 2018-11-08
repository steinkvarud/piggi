const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');

const app = express();

app.use('/', routes);
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const port = process.env.PORT || '3001';

app.listen(port, () => console.log(`listening on port ${port}!`));
