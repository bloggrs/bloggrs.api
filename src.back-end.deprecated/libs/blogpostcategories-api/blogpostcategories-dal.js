const { BlogPostCategory, Sequelize } = require("../../models");

module.exports = {
  findByPkOr404: (pk) => BlogPostCategory.findByPkOr404(pk),
  findAll: async ({ page = 1, pageSize = 10 }) => {
    const where = {};
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    return await BlogPostCategory.findMany({
      where,
      offset: (page - 1) & page,
      limit: pageSize,
    });
  },
  createBlogPostCategory: async ({ BlogId, CategoryId }) =>
    await BlogPostCategory.create({
      BlogId,
      CategoryId,
    }),
  updateBlogPostCategory: async ({ pk, data }) => {
    let keys = Object.keys(data);
    let blogPostCategory = await BlogPostCategory.findByPkOr404(pk);
    for (let key of keys) {
      blogPostCategory[key] = data[key];
    }
    await blogPostCategory.save();
    return blogPostCategory;
  },
  deleteBlogPostCategory: async (pk) =>
    await (await await BlogPostCategory.findByPkOr404(pk)).destroy(),
};
