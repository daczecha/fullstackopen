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

describe('when sending get request to /api/blogs, verify that ', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs are in correct amount', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toEqual(2);
  });

  test('blogs have identifier property named "id"', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((element) => {
      expect(element.id).toBeDefined();
    });
  });
});

describe('when sending post request to /api/blogs, verify that ', () => {
  test('blogs can be created, the content matches and number of total blogs is increased', async () => {
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

  test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
    const payload = {
      author: 'Mama',
      likes: 13,
    };

    const payloadWithUrl = {
      author: 'Mama',
      url: 'test.com',
      likes: 13,
    };

    const payloadWithTitle = {
      author: 'Mama',
      title: 'test',
      likes: 13,
    };

    await api.post('/api/blogs').send(payload).expect(400);
    await api.post('/api/blogs').send(payloadWithUrl).expect(400);
    await api.post('/api/blogs').send(payloadWithTitle).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
