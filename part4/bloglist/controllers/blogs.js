require('express-async-errors');

const jwt = require('jsonwebtoken');

//create router
const blogsRouter = require('express').Router();

const app = require('../app');
//models
const Blog = require('../models/blog');
const User = require('../models/user');

//Verify token
const verifyToken = (request, response, next) => {
  const token = request.token;

  if (!token)
    return response.status(401).json({ error: 'You are not authenticated!' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return response.status(401).json({ error: 'Invalid Token!' });

    request.user = decoded;
    next();
  });
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', verifyToken, async (request, response) => {
  if (
    !(
      typeof request.body.title === 'string' &&
      request.body.title.length > 0 &&
      typeof request.body.url === 'string' &&
      request.body.url.length > 0
    )
  ) {
    return response.status(400).json({ error: 'bad request' });
  }

  const body = request.body;
  const user = request.user;
  if (!user) return response.status(401).json({ error: 'invalid user' });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();

  const userDoc = await User.findById(user.id);
  userDoc.blogs = userDoc.blogs.concat(savedBlog.id.toString());
  userDoc.save();

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

blogsRouter.delete('/:id', verifyToken, async (request, response) => {
  const user = await User.findById(request.user.id);
  const blog = await Blog.findById(request.params.id);
  const canDelete =
    blog.user.toString() === request.user.id.toString() ? true : false;
  if (!canDelete) {
    return response
      .status(401)
      .json({ error: 'you have no permission to delete this blog' });
  }
  const blogs = await Blog.findByIdAndDelete(request.params.id);
  user.blogs = user.blogs.filter((e) => e !== blog.id.toString());
  user.save();
  response.status(204).json(blogs);
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body);
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }
  return response.status(200).json(blog);
});

module.exports = blogsRouter;
