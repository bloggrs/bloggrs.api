
const { BlogContact, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => BlogContact.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await BlogContact.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createBlogContact: async ({ 
        name
     }) => await BlogContact.create({ 
        name
      }),
    updateBlogContact: async ({pk,data}) => {
        let keys = Object.keys(data);
        let blogContact = await BlogContact.findByPkOr404(pk);
        for (let key of keys){
            blogContact[key] = data[key]
        }
        await blogContact.save();
        return blogContact;
    },
    deleteBlogContact: async (pk) => await (await (await BlogContact.findByPkOr404(pk))).destroy()
}
