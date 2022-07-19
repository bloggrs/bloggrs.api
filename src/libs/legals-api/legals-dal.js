
const prisma = require("../../prisma");

module.exports = {
    findByPkOr404: pk => prisma.legals.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.legals.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createLegal: async ({ 
        contract_type, start_date, end_date,
        comment, file_url, ClientId
     }) => await prisma.legals.create({ 
         data: {
            contract_type, start_date, end_date,
            comment, file_url, ClientId
         }
      }),
    updateLegal: async ({pk,data}) => {
        let keys = Object.keys(data);
        let legal = await prisma.legals.findByPkOr404(pk);
        for (let key of keys){
            legal[key] = data[key]
        }
        await legal.save();
        return legal;
    },
    deleteLegal: async (pk) => await (await (await prisma.legals.findByPkOr404(pk))).destroy()
}
