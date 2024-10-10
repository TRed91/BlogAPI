const { Router } = require('express');
const controller = require('../controllers/userController');
const router = Router();

router.get('/', userTypeSet, controller.userGetMany);
router.get('/:userId', userTypeSet, controller.userGet);
router.post('/',userTypeSet ,controller.userPost);
router.put('/:userId',userTypeSet , controller.userPut);
router.delete('/:userId',userTypeSet , controller.userDelete);

function userTypeSet (req, res, next) {
    req.author = false;
    next();
}

module.exports = router;