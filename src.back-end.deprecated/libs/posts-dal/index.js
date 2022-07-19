const { Post, PostLike, PostComment, Sequelize } = require("../../models");

module.exports = {
  findPostsForBlog: async (BlogId, { page = 1, pageSize = 10 } = {}) => {
    const where = {
      BlogId,
    };
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    let posts = await Post.findMany({
      where,
      offset: (page - 1) & page,
      limit: pageSize,
    });
    posts = posts.map(async (post) => {
      post = JSON.parse(JSON.stringify(post));
      const likes_count = await PostLike.count({
        where: { PostId: post.id },
      });
      const comments_count = await PostComment.count({
        where: { PostId: post.id },
      });
      const meta = {
        likes_count,
        comments_count,
      };
      post.meta = meta;
      return post;
    });
    return Promise.all(posts);
  },
  findPost: async (PostId) => {
    let post = await Post.findByPkOrError(PostId);
    post = JSON.parse(JSON.stringify(post));
    const likes_count = await PostLike.count({
      where: { PostId: post.id },
    });
    const comments_count = await PostComment.count({
      where: { PostId: post.id },
    });
    const meta = {
      likes_count,
      comments_count,
    };
    post.meta = meta;
    return post;
  },
};
