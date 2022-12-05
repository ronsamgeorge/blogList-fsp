require("dotenv").config();
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

const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL)
.then(() => {
    console.log('connected to Database');
})
.catch(err => console.log(err));

app.get('/api/blogs', (req,res) => {
    Blog.find({})
    .then(result => {
        console.log(resullt);
    })
    .catch(err => console.log(err));
})

app.post('/api/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => console.log(err));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})