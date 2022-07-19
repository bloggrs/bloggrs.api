
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.postcomments.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 3, PostId, BlogId }) => {
        page = Number(page); pageSize = Number(pageSize);
        const where = {}
        if (PostId) where.PostId = Number(PostId);
        if (BlogId) {
            const posts = await prisma.posts.findMany({ where: { BlogId: Number(BlogId) }});
            const blog_post_ids = posts.map(p => p.id);
            where.OR = blog_post_ids.map(pid => ({
                PostId: pid
            })) 
        }
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        const count = await prisma.postcomments.count({
            where
        })
        const postcomments = await prisma.postcomments.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
        return { postcomments, count }
    },
    createPostComment: async ({ 
        content, PostId, UserId
     }) => await prisma.postcomments.create({ 
        data: { content, PostId, UserId }
      }),
    updatePostComment: async ({pk,data}) => {
        let keys = Object.keys(data);
        let postComment = await prisma.postcomments.findByPkOr404(pk);
        for (let key of keys){
            postComment[key] = data[key]
        }
        await postcomments.save();
        return postComment;
    },
    deletePostComment: async (pk) => await (await (await prisma.postcomments.findByPkOr404(pk))).destroy()
}
