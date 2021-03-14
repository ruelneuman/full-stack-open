const dummy = () => {
  return 1;
};

const totalLikes = (blogs = []) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs = []) => {
  if (blogs.length === 0) return null;

  const favoriteBlog = blogs.reduce((mostLikedBlog, blog) => {
    return (mostLikedBlog.likes >= blog.likes) ? mostLikedBlog : blog;
  }, blogs[0]);

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
};

const mostBlogs = (blogs = []) => {
  if (blogs.length === 0) return null;

  const authorCounts = blogs.reduce((authorCounts, blog) => {
    const count = authorCounts[blog.author] + 1 || 1;
    return { ...authorCounts, [blog.author]: count };
  }, {});

  const mostBlogsAuthor = Object.keys(authorCounts).reduce((mostBlogsAuthor, author) => {
    return (!mostBlogsAuthor || authorCounts[author] >= authorCounts[mostBlogsAuthor])
      ? author
      : mostBlogsAuthor;
  }, '');

  return { author: mostBlogsAuthor, blogs: authorCounts[mostBlogsAuthor] };
};

const mostLikes = (blogs = []) => {
  if (blogs.length === 0) return null;

  const likeCounts = blogs.reduce((likeCounts, blog) => {
    const count = likeCounts[blog.author] + blog.likes || blog.likes;
    return { ...likeCounts, [blog.author]: count };
  }, {});

  const mostLikesAuthor = Object.keys(likeCounts).reduce((mostLikesAuthor, likes) => {
    return (!mostLikesAuthor || likeCounts[likes] >= likeCounts[mostLikesAuthor])
      ? likes
      : mostLikesAuthor;
  }, '');

  return { author: mostLikesAuthor, likes: likeCounts[mostLikesAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};