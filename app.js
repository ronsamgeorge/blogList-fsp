require('express-async-errors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const middleware = require('./utils/middleware');
const cors = require('cors');
const config = require('./utils/config');

const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const mongoURL = config.mongo_url;

mongoose.connect(mongoURL)
.then(() => {
    logger.info('connected to Database');
})
.catch(err => logger.error(err));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;