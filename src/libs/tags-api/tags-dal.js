const prisma = require("../../prisma");
const { ErrorHandler } = require("../../utils/error");

prisma.tags.findByPkOr404 = async (pk) => {
  const tag = await prisma.tags.findUnique( { where: { id: Number(pk) } })
  if (!tag) throw ErrorHandler.get404("Tag");
  return tag;
  
}
module.exports = {
  findByPkOr404: prisma.tags.findByPkOr404,
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
    return await prisma.tags.findMany({
      where,
      skip: (page - 1) ? Number(page - 1) * Number(pageSize) : undefined,
      take: pageSize ? Number(pageSize) : undefined,
    });
  },
  createTag: async ({ name, slug }) =>
    await prisma.tags.create({
      data: { name, slug }
    }),
  updateTag: async ({ pk, data }) => {
    let keys = Object.keys(data);
    let tag = await prisma.tags.findByPkOr404({ where: { id: Number(pk) }});
    for (let key of keys) {
      tag[key] = data[key];
    }
    console.log({ where: { id: Number(pk) }, data })
    await prisma.tags.updateMany({ where: { id: Number(pk) }, data })
    return tag;
  },
  deleteTag: async (pk) =>
    await (await await prisma.tags.delete({ where: { id: Number(pk) }})),
};