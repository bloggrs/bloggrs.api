
const prisma = require("../../prisma");

prisma.medias.findByPkOr404 = async (pk) => {
  const media = await prisma.medias.findUnique( { where: { id: Number(pk) } })
  if (!media) throw ErrorHandler.get404("Media");
  return media;
  
}
module.exports = {
    findByPkOr404: pk => prisma.medias.findByPkOr404(pk),
    findAll: async ({ page = 1, pageSize = 10 }) => {
        const where = {}
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        return await prisma.medias.findMany({
            where,
            skip: (Number(page) - 1) & Number(page),
            take: Number(pageSize),
        })
    },
    createMedia: async ({ 
        fieldName,
        originalName,
        encoding,
        mimetype,
        size,
        media_url,
        BlogId
     }) => await prisma.medias.create({ 
        data: {
            fieldName,
            originalName,
            encoding,
            mimetype,
            size,
            media_url,
            BlogId
        }
      }),
    updateMedia: async ({pk,data}) => {
        let keys = Object.keys(data);
        let media = await prisma.medias.findByPkOr404(pk);
        for (let key of keys){
            media[key] = data[key]
        }
        await media.save();
        return media;
    },
    deleteMedia: async (pk) => await (await (await prisma.medias.findByPkOr404(pk))).destroy()
}
