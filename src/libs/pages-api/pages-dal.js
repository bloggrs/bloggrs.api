
const prisma = require("../../prisma");
const { ErrorHandler } = require("../../utils/error");
const { setBlocks, getBlocks } = require("../blocks-dal");

const transformPage = async page => {
    // console.log({ blog },222)
    // page = JSON.parse(JSON.stringify(page));
    // page.blocks = await getBlocks({ PageId: page.id })
    return page;
}
  
const findByPkOr404 = async pk => {
    const page = await prisma.pages.findUnique({
        where: { id: Number(pk) }
    })
    if (!page) throw new ErrorHandler.get404("Page");
    return transformPage(page);
}
const findByBlogSlugOr404 = async ({ BlogId, slug }) => {
    const page = await prisma.pages.findFirst({
        where: { BlogId: Number(BlogId), slug }
    })
    if (!page) throw new ErrorHandler.get404("Page");
    return transformPage(page);
}

module.exports = {
    transformPage,
    findByPkOr404,
    findByBlogId: async ( BlogId ) => {
        const pages = await prisma.pages.findMany({
            where: {
                BlogId
            }
        })
        return await Promise.all(
            pages.map(page => transformPage(page))
        );
    },
    findByBlogSlugOr404,
    findAll: async ({ page = 1, pageSize = 10, BlogId }) => {
        const where = {}
        if (BlogId) where.BlogId = BlogId;
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        const pages = await prisma.pages.findMany({
            where,
            skip: (page - 1) & page,
            take: pageSize,
        })
        const insert_blocks_rule = async page => await transformPage(page);
        return Promise.all(pages.map(insert_blocks_rule))
    },
    createPage: async ({ 
        name, slug, BlogId, UserId
     }) => {
        const page = await prisma.pages.create({ 
            data: { name, slug, BlogId, UserId }
        })
        // if (blocks) await setBlocks({ PageId: page.id, blocks })
        return transformPage(page);
    },
    updatePage: async ({pk,data}) => {
        pk = Number(pk);
        let keys = Object.keys(data);
        let page = await findByPkOr404(pk);
        for (let key of keys){
            if (key === "blocks") await setBlocks({ PageId: page.id, blocks: data[key] })
            else page[key] = data[key]
        }
        const { blocks, id, ...update_data } = page;
        await prisma.pages.update({ where: { id: pk }, data: update_data });
        return transformPage(page);
    },
    deletePage: async (pk) => await (await (await findByPkOr404(pk))).destroy()
}