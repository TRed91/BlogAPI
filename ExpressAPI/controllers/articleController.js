const db = require('../db/articleQueries');

exports.articlePost = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = await db.articleCreate(userId, req.body);
        return res.json({ message: 'article created', article: result });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'server error' });
    }
}