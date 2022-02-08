const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + (b.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {};

  return blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
