
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.postlikes.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.postlikes.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPostLike: async ({ 
        PostId, UserId
     }) => await prisma.postlikes.create({ 
        data: { PostId, UserId }
      }),
    updatePostLike: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postLike = await prisma.postlikes.findByPkOr404(pk);
        for (let key of keys){
            postLike[key] = data[key]
        }
        await postlikes.save();
        return postLike;
    },
    deletePostLike: async (pk) => await (await (await prisma.postlikes.findByPkOr404(pk))).destroy()
}
