const prisma = require("../../prisma");
const { convert } = require('html-to-text');

function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

const getPostContentText = post => truncate(convert(post.html_content), 450);

module.exports = {
  findPostsForBlog: async (BlogId, UserId, { page = 1, pageSize = 10, categories, status } = {}) => {
    const where = {
      BlogId: Number(BlogId),
    };
    if (status) where.status = { equals: status }
    if (categories) {
      categories = categories.split(",");
      where.postcategories = {
          some: {
              categories: {
                  slug: {
                      in: categories
                  }
              }
          }
      }
  }
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    let posts = await prisma.posts.findMany({
      where,
      include: {
        users: true
      },
      skip: Number(page) - 1 && Number(page-1) * Number(pageSize),
      take: Number(pageSize),
    });
    posts = posts.map(async (post) => {
      post = JSON.parse(JSON.stringify(post));
      const liked = Boolean(await prisma.postlikes.count({
        where: { PostId: post.id, UserId }
      }))
      const likes_count = await prisma.postlikes.count({
        where: { PostId: post.id },
      });
      const comments_count = await prisma.postcomments.count({
        where: { PostId: post.id },
      });
      const meta = {
        likes_count,
        comments_count,
        liked,
        content_text: getPostContentText(post)
      };
      post.meta = meta;
      return post;
    });
    return Promise.all(posts);
  },
  findPost: async (PostId) => {
    let where = {};
    const is_ID = !isNaN(Number(PostId));
    
    if (is_ID) where.id = Number(PostId)
    else where.slug = PostId

    let post = await prisma.posts.findFirst({ where });
    post = JSON.parse(JSON.stringify(post));
    const likes_count = await prisma.postlikes.count({
      where: { PostId: post.id },
    });
    const comments_count = await prisma.postcomments.count({
      where: { PostId: post.id },
    });
    const meta = {
      likes_count,
      comments_count,
      content_text: getPostContentText(post)
    };
    post.meta = meta;
    return post;
  },
};
