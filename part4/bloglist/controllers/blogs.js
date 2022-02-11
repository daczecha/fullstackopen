require('express-async-errors');

//create router
const blogsRouter = require('express').Router();

//models
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: 'bad request' });
  }
  const body = request.body;
  const user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
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
