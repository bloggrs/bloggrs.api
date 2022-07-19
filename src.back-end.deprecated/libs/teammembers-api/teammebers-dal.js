
const { TeamMember, Sequelize } = require("../../models");

module.exports = {
    findByPkOr404: pk => TeamMember.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await TeamMember.findMany({
            where,
            offset: (page - 1) & page,
            limit: pageSize,
        })
    },
    createTeamMember: async ({ 
        UserId, BlogId
     }) => await TeamMember.create({ 
        UserId, BlogId
      }),
    updateTeamMember: async ({pk,data}) => {
        let keys = Object.keys(data);
        let teamMember = await TeamMember.findByPkOr404(pk);
        for (let key of keys){
            teamMember[key] = data[key]
        }
        await teamMember.save();
        return teamMember;
    },
    deleteTeamMember: async (pk) => await (await (await TeamMember.findByPkOr404(pk))).destroy()
}
