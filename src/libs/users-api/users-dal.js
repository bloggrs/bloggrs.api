
const prisma = require("../../prisma")
const { v1: uuid } = require('uuid')

const SALT_ROUNDS = 10;

const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../../utils/error");

module.exports = {
    findByPk: async pk => await prisma.users.findUnique({ where: { id: pk }}),
    findAll: async () => await prisma.users.findMany(),
    deleteUser: async pk => await prisma.users.delete({ where: { id: pk }}),
    createUser: async ({
        email, first_name, last_name, password
    }) => {
        let user = await prisma.users.create({
            data: {
                username: email,
                firstName: first_name,
                lastName: last_name,
                email,
                password: await bcrypt.hash(password, SALT_ROUNDS),
                status: "active",
                role: "user", 
                emailVerified: false,
                failedLoginAttempts: 0,
                twoFactorEnabled: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return user;
    },
    createUserUnrestricted: async ({
        first_name, last_name,
        email, password
    }) => {
        let args = { 
            firstName: first_name || "John",
            lastName: last_name || "Doe", 
            email: email || "user" + uuid() + "@example.com",
            username: email || "user" + uuid() + "@example.com",
            status: "active",
            role: "user",
            emailVerified: false,
            failedLoginAttempts: 0,
            twoFactorEnabled: false
        }
        if (password) args.password = await bcrypt.hash(password, SALT_ROUNDS)
        let user = await prisma.users.create({ data: args })
        return user; 
    },
    updateUser: async ({pk,data}) => {
        let keys = Object.keys(data);
        let user = await prisma.users.findUnique({ where: { id: Number(pk) }});
        user = JSON.parse(JSON.stringify(user))
        for (let key of keys){
            user[key] = key === "password" ? await bcrypt.hash(data[key], SALT_ROUNDS) : data[key]
        }
        updatedUser = await prisma.users.update({
            data: user,
            where: { id: user.id },
        })
        // await user.save();
        return updatedUser;
    }
}