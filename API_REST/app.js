require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const livrosRouter = require('./routes/livrosRouter');
const apidocsRouter = require('./routes/apidocs');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

mongoose
    .connect(url)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log("Erro ao conectar com MongoDB", err.message));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livros', livrosRouter);
app.use("/api-docs", apidocsRouter);

module.exports = app;
