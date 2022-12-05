const config = require("./utils/config");
const logger = require("./utils/logger")
const http = require('http');
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const app = express();
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const { nextTick } = require("process");

const mongoURL = config.mongo_url;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL)
.then(() => {
    logger.info('connected to Database');
})
.catch(err => logger.error(err));


app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


const PORT = config.port || 8080;
app.listen(PORT, () => {
    logger.info(`Listening on port : ${PORT}`);
})