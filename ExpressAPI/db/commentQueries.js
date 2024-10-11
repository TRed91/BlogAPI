const prisma = require('./prismaClient');

exports.commentCreate = async(userId, articleId, text) => {
    return await prisma.comment.create({
        data: {
            userId: userId,
            articleId: articleId,
            text: text,
        },
    });
}

exports.commentUpdate = async(commentId, text) => {
    return await prisma.comment.update({
        where: { id: commentId },
        data: { text: text },
    });
}

exports.commentDelete = async(commentId) => {
    await prisma.comment.delete({
        where: { id: commentId },
    });
}

exports.commentRead = async(commentId) => {
    return await prisma.comment.findUnique({
        where: { id: commentId },
    });
}