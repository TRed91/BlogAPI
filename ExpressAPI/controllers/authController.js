const db = require('../db/userQueries');

exports.AuthorAuthentication = async(req, res) => {
    const user = await db.userFind(req.user.id);
    if (user.usertypeId == 1){
        return res.json({result: 'success', user: req.user});
    } else {
        return res.status(401).json({result: 'error', error: 'not authorized'});
    }
}

exports.ReaderAuthentication = async(req, res) => {
    const user = await db.userFind(req.user.id);
    if (user.usertypeId == 2){
        return res.json({result: 'success', user: req.user});
    } else {
        return res.status(401).json({result: 'error', error: 'not authorized'});
    }
}