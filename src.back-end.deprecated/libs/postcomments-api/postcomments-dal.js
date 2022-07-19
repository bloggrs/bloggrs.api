
const { PostComment, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => PostComment.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await PostComment.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPostComment: async ({ 
        content, PostId, UserId
     }) => await PostComment.create({ 
        content, PostId, UserId
      }),
    updatePostComment: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postComment = await PostComment.findByPkOr404(pk);
        for (let key of keys){
            postComment[key] = data[key]
        }
        await postComment.save();
        return postComment;
    },
    deletePostComment: async (pk) => await (await (await PostComment.findByPkOr404(pk))).destroy()
}
