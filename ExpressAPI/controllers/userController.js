const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/userQueries');

const validateUser = [
    body('name').trim()
        .isLength({min: 1})
        .withMessage("Username can't be empty"),
    body('email').trim()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    body('password').trim()
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long"),
    body('cpw').trim()
        .custom((cpw, {req}) => cpw === req.body.password)
        .withMessage("Passwords must match")
]

exports.userPost = [
    validateUser,

    (req, res) => {
        const { name, email, password, cpw } = req.body;

        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errorMessages });
        }

        bcrypt.hash(password, 10, async(err, hashedPW) => {
            if (err) {
                console.error('Hashing Error: ', err.message);
                return res.sendStatus(500);
            }
            try {
                const type = req.author ? 1 : 2;
                const result = await db.userCreate({ name, email, password: hashedPW, type: type });
                return res.json({ result: 'success', created: result });
            } catch (err) {
                console.error('Author post error: ', err);
                let errMsg
                if (err.meta.target.length > 0) {
                    errMsg = `${err.meta.target[0]} already exists`;
                } else {
                    errMsg = 'connection error';
                }
                return res.status(500).json({ error: 'error querying database', message: errMsg } )
            }
        });
    }
];

exports.userPut = [
    validateUser,

    (req, res) => {
        const { name, email, password, cpw } = req.body;
        const id = parseInt(req.params.userId);

        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errorMessages });
        }

        bcrypt.hash(password, 10, async(err, hashedPW) => {
            if (err) {
                console.error('Hashing Error: ', err.message);
                return res.sendStatus(500);
            }
            try {
                const result = await db.userUpdate({ id, name, email, password: hashedPW });
                return res.json({ result: 'success', created: result });
            } catch (err) {
                console.error('Author put error: ', err);
                let errMsg
                if (err.meta.target.length > 0) {
                    errMsg = `${err.meta.target[0]} already exists`;
                } else {
                    errMsg = 'connection error';
                }
                return res.status(500).json({ error: 'error querying database', message: errMsg } )
            }
        });
    }
];

exports.userGet = async (req, res) => {
    const id = parseInt(req.params.userId);
    try {
        const data = await db.userFind(id);
        return res.json({ author: data });
    } catch (err) {
        console.error('Read author error: ', err.message);
        return res.status(500).json({ message: 'Author not found.' });
    }
}

exports.userGetMany = async (req, res) => {
    const userType = req.author ? 1 : 2;
    try {
        const users = await db.userFindMany(userType);
        return res.json({ users: users });
    } catch (err) {
        console.error('Find users error: ', err.message);
        return res.status(500).json({ message: 'Database error' });
    }
}

exports.userDelete = async (req, res) => {
    const id = parseInt(req.params.userId);
    try {
        const result = await db.userDelete(id)
        return res.json({ result: result });
    } catch (err) {
        console.error('Authot delete error: ', err.message);
        return res.status(500).json({ message: 'Deletion failed' });
    }
}

exports.userLogin = async (req, res) => {
    try{
        const user = await db.userFindByName(req.body.name);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong Password' });
        }

        jwt.sign({user: user}, 'dinkelberg', (err, token) => {
            if (err) {
                console.error(err.message);
                return res.status(400).json({ error: err.message });
            }
            return res.json({ result: 'success', token: token });
        });
    } catch (err) {
        console.error('login error: ', err.message);
        res.status(500).json({ message: 'Server error' })
    }
}