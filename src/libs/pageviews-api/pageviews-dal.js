
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.pageviews.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        return await prisma.pageviews.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createPageView: async ({ 
        SiteSessionId, pathname
     }) => await prisma.pageviews.create({ 
         data: {
            SiteSessionId, pathname
         }
      }),
    updatePageView: async ({pk,data}) => {
        let keys = Object.keys(data);
        let pageview = await prisma.pageviews.findByPkOr404(pk);
        for (let key of keys){
            pageview[key] = data[key]
        }
        await pageview.save();
        return pageview;
    },
    deletePageView: async (pk) => await (await (await prisma.pageviews.findByPkOr404(pk))).destroy()
}
