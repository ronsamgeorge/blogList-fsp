const config = require("./utils/config");
const logger = require("./utils/logger")
const http = require('http');
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    url : String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    } 
})

const Blog = mongoose.model('Blog',blogSchema);

const mongoURL = config.mongo_url;
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