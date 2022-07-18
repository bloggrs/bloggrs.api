
const prisma = require("../../prisma")

module.exports = {
    findByPkOr404: pk => prisma.blogthemes.findByPkOr404(pk),
    findAll: async ({ query, page = 1, pageSize = 10 }) => {
        const where = {}
        if (query) where.name = { contains: query }
        return await prisma.blogthemes.findMany({
            where,
            skip: (page - 1) & page,
            take: pageSize,
        })
    },
    createBlogTheme: async ({ 
        name, description, image_url
     }) => await prisma.blogthemes.create({ 
        data: { name, description, image_url }
      }),
    updateBlogTheme: async ({pk,data}) => {
        let keys = Object.keys(data);
        let blogTheme = await prisma.blogthemes.findByPkOr404(pk);
        for (let key of keys){
            blogTheme[key] = data[key]
        }
        await blogTheme.save();
        return blogTheme;
    },
    deleteBlogTheme: async (pk) => await (await (await prisma.blogthemes.findByPkOr404(pk))).destroy()
}
