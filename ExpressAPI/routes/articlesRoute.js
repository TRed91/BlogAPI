const { Router } = require('express');
const { articleController } = require('../controllers/index');
const router = Router();

router.get('/', articleController.articleGetAllPublished);
router.get('/:articleId', articleController.articleGetOnePublished);

module.exports = router;