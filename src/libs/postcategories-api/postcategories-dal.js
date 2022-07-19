
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.postcategories.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.postcategories.findMany({
            where,
            skip: (page - 1) & page,
            take: pageSize,
        })
    },
    createPostCategory: async ({ 
        name
     }) => await prisma.postcategories.create({ 
        data: { name }
      }),
    updatePostCategory: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postCategory = await prisma.postcategories.findByPkOr404(pk);
        for (let key of keys){
            postCategory[key] = data[key]
        }
        await prisma.postcategories.save();
        return postCategory;
    },
    deletePostCategory: async (pk) => await (await (await prisma.postcategories.findByPkOr404(pk))).destroy()
}
