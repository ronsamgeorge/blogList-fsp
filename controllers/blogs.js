const blogRouter = require('express').Router();
const Blog = require('../models/blogs');

blogRouter.get('/', async (req,res) => {
    const result = await Blog.find({});
    res.json(result);
})

blogRouter.post('/', async (req,res) => {

    // check if required url and title paramaters are present 
    if (!req.body.url || !req.body.title){
        return res.status(400).send({error: "Bad request"});
    }

    if (!req.body.likes){
        req.body.likes = 0;
    }

    const blog = new Blog(req.body);

    // Refactor code to await/ async format
    const result = await blog.save();
    res.status(201).json(result);


    // blog.save()
    // .then(result => {
    //     res.status(201).json(result);
    // })
    // .catch(err => logger.error(err));
})

blogRouter.get('/:id', async (req,res) => {
    const id = req.params.id;

    // Blog.findById(id)
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => logger.error(err));

    const result = await Blog.findById(id);
    res.json(result);
})

blogRouter.delete('/:id', async (req,res) => {
    const id = req.params.id;
    await Blog.findByIdAndRemove(id);
    res.status(204).send({message: "Resource Deleted"});
})

blogRouter.put('/:id', async(req,res) => {
    const content = req.body;
    const id = req.params.id;

    const newBlog = {
        title: content.title,
        url : content.url,
        author : content.author,
        likes : content.likes
    }

    const result = await Blog.findByIdAndUpdate(id, newBlog, {new : true})
    res.status(204).json(result);
})

module.exports = blogRouter;