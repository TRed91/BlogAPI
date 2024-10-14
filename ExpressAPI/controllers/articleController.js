const db = require('../db/articleQueries');

exports.articlePost = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await db.articleCreate(userId, req.body);
        return res.json({ result: 'success', message: 'article created', article: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}

exports.articlePutContent = async (req, res) => {
    try {
        const { title, text } = req.body;
        const articleId = parseInt(req.params.articleId);

        const result = await db.articleUpdateContent(articleId, { title: title, text: text });
        return res.json({ result: 'success', message: 'article updated', article: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}

exports.articlePutPublished = async (req, res) => {
    try {
        const isPublished = req.body.publish === 'true' ? true : false;
        const articleId = parseInt(req.params.articleId);
        const result = await db.articleUpdatePublished(articleId, isPublished);
        return res.json({ result: 'success', message: 'article updated', article: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}

exports.articleGetOne = async (req, res) => {
    try {
        const articleId = parseInt(req.params.articleId);
        const result = await db.articleReadOne(articleId);
        return res.json({ result: 'success', article: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}

exports.articleGetAll = async(req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await db.articleReadAllByUser(userId);
        return res.json({ result: 'success', articles: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}

exports.articleDelete = async(req, res) => {
    try {
        const articleId = parseInt(req.params.articleId);
        await db.articleDelete(articleId);
        return res.json({ result: 'deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ result: 'error', error: 'server error' });
    }
}