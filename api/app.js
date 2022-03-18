const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

module.exports = app;