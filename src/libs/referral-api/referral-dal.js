
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.referrals.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.referrals.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createReferral: async ({ 
        type, BlogId, UserId
     }) => await prisma.referrals.create({ 
        data: { type, BlogId, UserId }
      }),
    updateReferral: async ({pk,data}) => {
        let keys = Object.keys(data);
        let referral = await prisma.referrals.findByPkOr404(pk);
        for (let key of keys){
            referral[key] = data[key]
        }
        await referrals.save();
        return referral;
    },
    deleteReferral: async (pk) => await (await (await prisma.referrals.findByPkOr404(pk))).destroy()
}
