const blogRouter = require('express').Router();
const Blog = require('../models/blogs');


blogRouter.get('/', (req,res) => {
    Blog.find({})
    .then(result => {
        res.json(result);
    })
    .catch(err => logger.error(err));
})

blogRouter.post('/', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => logger.error(err));
})

blogRouter.get('/:id', (req,res) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(result => {
        res.json(result);
    })
    .catch(err => logger.error(err));
})

module.exports = blogRouter;