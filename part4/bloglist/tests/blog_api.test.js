const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  jest.setTimeout(10000);
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs are correct amount', async () => {
  jest.setTimeout(10000);
  const response = await api.get('/api/blogs');

  expect(response.body.length).toEqual(2);
});

test('blogs have identifier property named "id"', async () => {
  jest.setTimeout(10000);
  const response = await api.get('/api/blogs');

  response.body.forEach((element) => {
    expect(element.id).toBeDefined();
  });
});

test('blogs can be created', async () => {
  jest.setTimeout(10000);

  const payload = {
    title: 'Why does my back hurt?',
    author: 'Mama',
    url: 'url.com',
    likes: 4129,
  };

  await api.post('/api/blogs').send(payload).expect(201);

  const response = await api.get('/api/blogs');

  const blogs = response.body;
  const lastBlog = blogs[blogs.length - 1];
  delete lastBlog.id;

  expect(blogs.length).toEqual(helper.initialBlogs.length + 1);
  expect(payload).toEqual(lastBlog);
});

test('if the likes property is missing from the request, it will default to the value 0.', async () => {
  jest.setTimeout(10000);

  const payload = {
    title: 'Why does my back hurt?',
    author: 'Mama',
    url: 'url.com',
  };

  await api.post('/api/blogs').send(payload).expect(201);

  const response = await api.get('/api/blogs');

  const blogs = response.body;
  const lastBlog = blogs[blogs.length - 1];

  expect(lastBlog.likes).toBeDefined();
  expect(lastBlog.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
