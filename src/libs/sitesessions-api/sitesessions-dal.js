
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.sitesessions.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.sitesessions.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createSiteSession: async ({ 
        endedAt, UserId, BlogId
     }) => {
        const data = { endedAt, UserId, BlogId };
        const only_filled = { };
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) only_filled[key] = data[key] 
        })
        return await prisma.sitesessions.create({ 
            data: {
                endedAt,
                users: !UserId ? {} : { connect: { id: UserId }},
                blogs: !BlogId ? {} : { connect: { id: BlogId }}
            }
        })
    },
    updateSiteSession: async ({pk,data}) => {
        let keys = Object.keys(data);
        let sitesession = await prisma.sitesessions.findByPkOr404(pk);
        for (let key of keys){
            sitesession[key] = data[key]
        }
        await sitesession.save();
        return sitesession;
    },
    deleteSiteSession: async (pk) => await (await (await prisma.sitesessions.findByPkOr404(pk))).destroy()
}
