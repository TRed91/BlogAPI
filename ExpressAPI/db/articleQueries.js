const prisma = require('./prismaClient');

exports.articleCreate = async(authorId, data) => {
    return await prisma.article.create({
        data: {
            userId: authorId,
            title: data.title,
            text: data.text,
        },
    });
}