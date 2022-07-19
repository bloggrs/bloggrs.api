
const { PostLike, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => PostLike.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await PostLike.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPostLike: async ({ 
        PostId, UserId
     }) => await PostLike.create({ 
        PostId, UserId
      }),
    updatePostLike: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postLike = await PostLike.findByPkOr404(pk);
        for (let key of keys){
            postLike[key] = data[key]
        }
        await postLike.save();
        return postLike;
    },
    deletePostLike: async (pk) => await (await (await PostLike.findByPkOr404(pk))).destroy()
}
