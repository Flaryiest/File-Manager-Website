const { PrismaClient, Prisma} = require('@prisma/client')
const prisma = new PrismaClient()

async function findUser(username) {
    let user = await prisma.user.findFirst({
        where: {
            username: username,
        },
    })
    return user
}

async function createUser(username, email, password) {
    await prisma.user.create({
        data: {
        username: username,
        email: email,
        password: password,
        },
    })
}

async function getAllUsers() {
    users = await prisma.user.findMany()
    return users
}

async function findUserById(id) {
    let user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
    console.log(user)
    return user
}

module.exports = {findUser, createUser, getAllUsers, findUserById}