const config = require("./utils/config");
const logger = require("./utils/logger")
const http = require('http');
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const app = express();
const Blog = require('./models/blogs');

const mongoURL = config.mongo_url;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL)
.then(() => {
    logger.info('connected to Database');
})
.catch(err => logger.error(err));

app.get('/api/blogs', (req,res) => {
    Blog.find({})
    .then(result => {
        res.json(result);
    })
    .catch(err => logger.error(err));
})

app.post('/api/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => logger.error(err));
})

app.get('/api/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(result => {
        res.json(result);
    })
    .catch(err => logger.error(err));
})

const PORT = config.port || 8080;
app.listen(PORT, () => {
    logger.info(`Listening on port : ${PORT}`);
})