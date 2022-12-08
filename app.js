require('express-async-errors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const cors = require('cors');
const config = require('./utils/config');

const mongoURL = config.mongo_url;

mongoose.connect(mongoURL)
.then(() => {
    logger.info('connected to Database');
})
.catch(err => logger.error(err));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;