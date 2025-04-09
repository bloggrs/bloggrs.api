
const { randomUUID } = require("crypto")
const prisma = require("../../prisma")

module.exports = {
    findUserByPk: async pk => await prisma.users.findUnique({ 
        where: { id: pk }
    }),
    createGuestUser: async () => await prisma.users.create({
        data: {
            first_name: randomUUID(), last_name: randomUUID(), email: randomUUID() + "@guest.com", isGuest: true,
            password: "dummy-password",
        }
    })
}