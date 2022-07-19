const { Category, Sequelize } = require("../../models");

module.exports = {
  findByPkOr404: (pk) => Category.findByPkOr404(pk),
  findAll: async ({ BlogId, page = 1, pageSize = 10 }) => {
    const where = {};
    if (BlogId) where.BlogId = BlogId;
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    return await Category.findMany({
      where,
      offset: (page - 1) & page,
      limit: pageSize,
    });
  },
  createCategory: async ({ name }) =>
    await Category.create({
      name,
    }),
  updateCategory: async ({ pk, data }) => {
    let keys = Object.keys(data);
    let category = await Category.findByPkOr404(pk);
    for (let key of keys) {
      category[key] = data[key];
    }
    await category.save();
    return category;
  },
  deleteCategory: async (pk) =>
    await (await await Category.findByPkOr404(pk)).destroy(),
};
