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

describe('blogs', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('are correct amount', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toEqual(2);
  });

  test('have identifier property named "id"', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((element) => {
      expect(element.id).toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
