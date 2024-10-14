const db = require('../db/commentQueries');

exports.commentPost = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const articleId = parseInt(req.params.articleId);
        const result = await db.commentCreate(userId, articleId, req.body.text);
        return res.json({ result: 'success' , message: 'comment created', comment: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: 'error', error: 'Server Error' });
    }
}

exports.commentPut = async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const result = await db.commentUpdate(commentId, req.body.text);
        return res.json({ result: 'success' , message: 'comment created', comment: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: 'error', error: 'Server Error' });
    }
}

exports.commentGet = async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const result = await db.commentRead(commentId);
        return res.json({ result: 'success', comment: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: 'error', error: 'Server Error' });
    }
}

exports.commentDelete = async (req, res) => {
    try{
        const commentId = parseInt(req.params.commentId);
        await db.commentDelete(commentId);
        return res.json({ result: 'success', message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ result: 'error', error: 'Server Error' });
    }
}