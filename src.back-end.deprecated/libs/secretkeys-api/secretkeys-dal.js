
const { SecretKey, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => SecretKey.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await SecretKey.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createSecretKey: async ({ 
        
     }) => await SecretKey.create({ 
        
      }),
    updateSecretKey: async ({pk,data}) => {
        let keys = Object.keys(data);
        let secretKey = await SecretKey.findByPkOr404(pk);
        for (let key of keys){
            secretKey[key] = data[key]
        }
        await secretKey.save();
        return secretKey;
    },
    deleteSecretKey: async (pk) => await (await (await SecretKey.findByPkOr404(pk))).destroy()
}
