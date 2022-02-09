require('express-async-errors');

//create router
const blogsRouter = require('express').Router();

//models
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  //if likes is not defined, define it and set it to 0
  const body = request.body.likes
    ? request.body
    : { ...request.body, likes: 0 };

  const blog = new Blog(body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
