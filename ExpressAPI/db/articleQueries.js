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

exports.articleUpdateContent = async(articleId, data) => {
    return await prisma.article.update({
        where: { id: articleId },
        data: { title: data.title,
                text: data.text,
            },
    });
}

exports.articleUpdatePublished = async(articleId, isPublished) => {
    return await prisma.article.update({
        where: { id: articleId },
        data: { published: (isPublished ? true : false),
                time: (isPublished? new Date() : null),
            },
    });
}

exports.articleReadAllByUser = async(authorId) => {
    return await prisma.article.findMany({
        where: { userId: authorId },
    });
}

exports.articleReadOne = async (articleId) => {
    return await prisma.article.findUnique({
        where: { id: articleId },
        include: { comments: true }, 
    });
}

exports.articleDelete = async(articleId) => {
    return await prisma.article.delete({
        where: { id: articleId },
    });
}