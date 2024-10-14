const { Router } = require('express');
const authenticate = require('./authentication');
const { userController, commentController } = require('../controllers/index');
const router = Router();

router.get('/', userTypeSet, userController.userGetMany);
router.get('/:userId', userTypeSet, userController.userGet);
router.post('/',userTypeSet ,userController.userPost);
router.put('/:userId',userTypeSet , userController.userPut);
router.delete('/:userId',userTypeSet , userController.userDelete);

router.post('/login', userController.userLogin);

function userTypeSet (req, res, next) {
    req.author = false;
    next();
}

router.post('/:userId/comments/:articleId', authenticate, commentController.commentPost);
router.get('/comments/:commentId', commentController.commentGet);
router.put('/comments/:commentId',authenticate ,commentController.commentPut);
router.delete('/comments/:commentId',authenticate, commentController.commentDelete)

module.exports = router;