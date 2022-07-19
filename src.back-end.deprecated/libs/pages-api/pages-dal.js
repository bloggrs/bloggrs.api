
const { Page, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => Page.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10, BlogId }) => {
        const where = {}
        if (BlogId) where.BlogId = BlogId;
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await Page.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPage: async ({ 
        name, slug, BlogId, UserId
     }) => await Page.create({ 
        name, slug, BlogId, UserId
      }),
    updatePage: async ({pk,data}) => {
        let keys = Object.keys(data);
        let page = await Page.findByPkOr404(pk);
        for (let key of keys){
            page[key] = data[key]
        }
        await page.save();
        return page;
    },
    deletePage: async (pk) => await (await (await Page.findByPkOr404(pk))).destroy()
}
