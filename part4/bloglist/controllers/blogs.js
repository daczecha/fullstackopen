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
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).json({ error: 'bad request' });
  } else {
    //if likes is not defined, define it and set it to 0
    const body = request.body.likes
      ? request.body
      : { ...request.body, likes: 0 };

    const blog = new Blog(body);
    const result = await blog.save();
    response.status(201).json(result);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blogs = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).json(blogs);
});

module.exports = blogsRouter;
