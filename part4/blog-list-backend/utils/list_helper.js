const blog = require("../models/blog");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favoriteBlog = blogs.reduce((mostLikedBlog, blog) => {
    return (mostLikedBlog.likes > blog.likes) ? mostLikedBlog : blog;
  }, blogs[0]);

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};