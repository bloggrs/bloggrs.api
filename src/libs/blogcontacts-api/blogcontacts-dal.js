
const prisma = require("../../prisma")

module.exports = {
    findByPkOr404: pk => prisma.blogcontacts.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.blogcontacts.findMany({
            where,
            skip: (page - 1) & page
            take: pageSize,
        })
    },
    createBlogContact: async ({ 
        name
     }) => await prisma.blogcontacts.create({ 
        data: { name }
      }),
    updateBlogContact: async ({pk,data}) => {
        let keys = Object.keys(data);
        let blogContact = await prisma.blogcontacts.findByPkOr404(pk);
        for (let key of keys){
            blogContact[key] = data[key]
        }
        await blogContact.save();
        return blogContact;
    },
    deleteBlogContact: async (pk) => await (await (await prisma.blogcontacts.findByPkOr404(pk))).destroy()
}
