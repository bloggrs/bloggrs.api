
const { Post, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => Post.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await Post.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPost: async ({ 
        title, slug, html_content, status,
        BlogId, UserId
     }) => await Post.create({ 
        title, slug, html_content, status,
        BlogId, UserId
      }),
    updatePost: async ({pk,data}) => {
        let keys = Object.keys(data);
        let post = await Post.findByPkOr404(pk);
        for (let key of keys){
            post[key] = data[key]
        }
        await post.save();
        return post;
    },
    deletePost: async (pk) => await (await (await Post.findByPkOr404(pk))).destroy()
}
