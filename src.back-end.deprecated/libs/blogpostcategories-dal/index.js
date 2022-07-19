const { BlogPostCategory, Sequelize } = require("../../models");

module.exports = {
  findAll: async ({ BlogId, page = 1, pageSize = 10 }) => {
    const where = {};
    if (BlogId) where.BlogId = BlogId;
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    return await BlogPostCategory.findMany({
      where,
      offset: (page - 1) & page,
      limit: pageSize,
      include: { all: true },
    });
  },
};
