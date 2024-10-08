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
    return user
}

async function createFolder(userID, folderName) {
    try {
        const newFolder = await prisma.folder.create({
            data: {
                name: folderName,
                User: {
                    connect: {id: userID}
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}

async function getFolders(userID) {
    try {
        const userFolders = await prisma.user.findUnique({
            where: {id: userID},
            include: {folders: true}
        })
        return userFolders.folders
    } catch(err) {
        console.log(err)
    }
}

async function getFolder(folderID) {
    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(folderID)
        },
        include: {files: true}
    })
    return folder
}

async function addFile(userID, fileName) {
    try {
        const newFile = await prisma.file.create({
            data: {
                fileName: fileName,
                User: {
                    connect: {id: userID}
                }
            }
        })
    } catch(err) {
        console.log(err)
    }
}

async function getFiles(userID) {
    try {
        const userFiles = await prisma.user.findUnique({
            where: {id: userID},
            include: {files: true}
        })
        return userFiles.files
    } catch(err) {
        console.log(err)
    }
}

async function deleteFile(fileID) {
    await prisma.file.delete({
        where: {
            id: Number(fileID)
        }
    })
}

async function findFile(fileID) {
    const file = await prisma.file.findUnique({
        where: {
            id: Number(fileID)
        }
    })
    return file
}

async function deleteFolder(folderID) {
    await prisma.folder.delete({
        where: {
            id: Number(folderID)
        }
    })
}

async function moveFile(folderID, fileID, userID) {
    await prisma.file.update({
        where: {
            id: Number(fileID)
        },
        data: {
            Folder: {
                connect: {id: Number(folderID)}
            }
        }

    })
    if (userID) {
        await prisma.file.update({
            where: {
                id: Number(fileID)
            },
            data: {
                User: {
                    disconnect: {id: Number(userID)}
                }
            }
        }) 
    }
}




async function getFolderFiles(folderID) {
    const folderFiles = await prisma.folder.findUnique({
        where: {
           id: Number(folderID) 
        },
        include: {files: true}
    })
    return folderFiles.files
}

async function returnFile(userID, fileID) {
    await prisma.file.update({
        where: {
            id: Number(fileID)
        },
        data: {
            User: {
                connect: {id: Number(userID)}
            }
        }
    })
}



module.exports = {findUser, createUser, getAllUsers, findUserById, createFolder, getFolders, getFolder, addFile, getFiles, deleteFile, findFile, deleteFolder, moveFile, getFolderFiles, returnFile}