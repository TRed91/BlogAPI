const prisma = require('./prismaClient');

exports.userCreate = async(data) => {
    const { name, email, password, type } = data;
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            usertypeId: type,
        },
    });   
}

exports.userUpdate = async(data) => {
    const { id, name, email, password } = data;
    return await prisma.user.update({
        where: { id: id },
        data: {
            name: name,
            email: email,
            password: password,
            usertypeId: 1,
        },
    });   
}

exports.userFind = async(id) => {
    return await prisma.user.findUnique({
        where: { id: id },
    });
}

exports.userFindByName = async(name) => {
    return await prisma.user.findUnique({
        where: { name: name },
    });
}

exports.userFindMany = async (usertypeId) => {
    return await prisma.user.findMany({
        where: { usertypeId: usertypeId },
        select: { 
            name: true,
            email: true,
            registered: true 
        },
    });
}

exports.userDelete = async(id) => {
    return await prisma.user.delete({
        where: { id: id },
    });
}