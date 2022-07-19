
const { PostCategory, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => PostCategory.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await PostCategory.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPostCategory: async ({ 
        name
     }) => await PostCategory.create({ 
        name
      }),
    updatePostCategory: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postCategory = await PostCategory.findByPkOr404(pk);
        for (let key of keys){
            postCategory[key] = data[key]
        }
        await postCategory.save();
        return postCategory;
    },
    deletePostCategory: async (pk) => await (await (await PostCategory.findByPkOr404(pk))).destroy()
}
