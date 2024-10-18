const { Router } = require('express');
const authenticate = require('./authentication');
const { authController } = require('../controllers/index');
const router = Router();

router.get('/reader', authenticate, authController.ReaderAuthentication);
router.get('/author', authenticate, authController.AuthorAuthentication);

module.exports = router;