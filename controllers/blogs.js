const blogRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7);
    }
    return null;
}

blogRouter.get('/', async (req,res) => {
    const result = await Blog.find({}).populate('user',{username : 1, name : 1});
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
    
    const token = getTokenFrom(req);
    const tokenUserInfo  = jwt.verify(token, config.SECRET);
    if(!(tokenUserInfo.id)){
        return res.status(401).json({error : "token missing or invalid"});
    }
    const {url, title, author, likes} = req.body;
    const user = await User.findById(tokenUserInfo.id);
    const blog = new Blog({
        title,
        author,
        user : user._id,
        likes,
        url
    });

    // Refactor code to await/ async format
    const result = await blog.save();
    user.blog =  user.blog.concat(result._id);
    await user.save();
    res.status(201).json(result);
})

blogRouter.get('/:id', async (req,res) => {
    const id = req.params.id;
    const result = await Blog.findById(id).populate('user',{username : 1, name : 1});
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