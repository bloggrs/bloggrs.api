const prisma = require("../../prisma");
const { ErrorHandler } = require("../../utils/error");

prisma.categories.findByPkOr404 = async (pk) => {
  const category = await prisma.categories.findUnique( { where: { id: Number(pk) } })
  if (!category) throw ErrorHandler.get404("Category");
  return category;
  
}
module.exports = {
  findByPkOr404: prisma.categories.findByPkOr404,
  findAll: async ({ BlogId, page = 1, pageSize = 10 }) => {
    const where = {};
    if (BlogId) where.BlogId = BlogId;
    // if (query) where[Sequelize.Op.or] = [
    //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
    //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
    // ]
    console.log({
      where,
      skip: (page - 1) ? Number(page - 1) * Number(pageSize) : undefined,
      take: pageSize ? Number(pageSize) : undefined,
    })
    return await prisma.categories.findMany({
      where,
      skip: (page - 1) ? Number(page - 1) * Number(pageSize) : undefined,
      take: pageSize ? Number(pageSize) : undefined,
    });
  },
  createCategory: async ({ name, slug }) =>
    await prisma.categories.create({
      data: { name, slug }
    }),
  updateCategory: async ({ pk, data }) => {
    let keys = Object.keys(data);
    let category = await prisma.categories.findByPkOr404({ where: { id: Number(pk) }});
    for (let key of keys) {
      category[key] = data[key];
    }
    console.log({ where: { id: Number(pk) }, data })
    await prisma.categories.updateMany({ where: { id: Number(pk) }, data })
    return category;
  },
  deleteCategory: async (pk) =>
    await (await await prisma.categories.delete({ where: { id: Number(pk) }})),
};