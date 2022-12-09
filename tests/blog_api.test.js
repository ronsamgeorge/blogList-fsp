const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const supertest = require('supertest');
const helper = require('./test_helper');

const api = supertest(app);

// beforeAll will keep the state of the test database uniform for all its tests
beforeAll(async() => {

    await Blog.deleteMany({});

    let newBlogInfo = new Blog(helper.initialTestBlogs[0]);
    await newBlogInfo.save();

    newBlogInfo = new Blog(helper.initialTestBlogs[1]);
    await newBlogInfo.save();
})

test('blog info are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('receive all blogs in DB', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(2);
})

test('id parameter is a string', async () =>{
    const blogs = await api.get('/api/blogs');

    expect(blogs.body[0].id).toBeDefined();
})

test('blog info is added to DB', async () => {
    const newBlog =  {
        "title" : "add test blog",
        "author" : "test",
        "url" : "www.XYZ.com/testAddBlog",
        "likes" : 456
    };

   await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(3);
})

test('blog with url/title missing is not added to DB', async () => {
    const newBlog =  {
        "title" : "add test blog",
        "author" : "test",
        "likes" : 456
    };

   await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
})



afterAll(() => {
    mongoose.connection.close();
})