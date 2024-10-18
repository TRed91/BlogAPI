const { Router } = require('express');
const authenticate = require('./authentication');
const { userController, articleController } = require('../controllers/index');
const router = Router();

router.get('/', userTypeSet, userController.userGetMany);
router.get('/:userId', userTypeSet, userController.userGet);
router.post('/',userTypeSet ,userController.userPost);
router.put('/:userId',userTypeSet , userController.userPut);
router.delete('/:userId',userTypeSet , userController.userDelete);

router.post('/login', userController.userLogin);

function userTypeSet (req, res, next) {
    req.author = true;
    next();
}

router.post('/:userId/articles', authenticate, articleController.articlePost);
router.put('/:userId/articles/:articleId', authenticate, articleController.articlePutContent);
router.put('/:userId/publish/:articleId', authenticate, articleController.articlePutPublished);
router.get('/:userId/articles/:articleId', authenticate, articleController.articleGetOne);
router.get('/:userId/articles/', authenticate, articleController.articleGetAllByUser);
router.delete('/:userId/articles/:articleId', authenticate, articleController.articleDelete);

module.exports = router;