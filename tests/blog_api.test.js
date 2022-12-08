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

afterAll(() => {
    mongoose.connection.close();
})