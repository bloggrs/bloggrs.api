
const { Legal, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => Legal.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await Legal.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createLegal: async ({ 
        contract_type, start_date, end_date,
        comment, file_url, ClientId
     }) => await Legal.create({ 
        contract_type, start_date, end_date,
        comment, file_url, ClientId
      }),
    updateLegal: async ({pk,data}) => {
        let keys = Object.keys(data);
        let legal = await Legal.findByPkOr404(pk);
        for (let key of keys){
            legal[key] = data[key]
        }
        await legal.save();
        return legal;
    },
    deleteLegal: async (pk) => await (await (await Legal.findByPkOr404(pk))).destroy()
}
