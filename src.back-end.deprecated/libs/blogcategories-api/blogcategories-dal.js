
const { BlogCategory, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => BlogCategory.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await BlogCategory.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createBlogCategory: async ({ 
        name
     }) => await BlogCategory.create({ 
        name
      }),
    updateBlogCategory: async ({pk,data}) => {
        let keys = Object.keys(data);
        let blogCategory = await BlogCategory.findByPkOr404(pk);
        for (let key of keys){
            blogCategory[key] = data[key]
        }
        await blogCategory.save();
        return blogCategory;
    },
    deleteBlogCategory: async (pk) => await (await (await BlogCategory.findByPkOr404(pk))).destroy()
}
