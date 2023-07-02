const {Router} = require('express');
const authController = require('../../controllers/user.controller');
const router = Router();

router.post('/register',authController.register);
router.post('/login', authController.login);
router.post('/login/google', authController.login);

router.get('/login/google', authController.loginGoogle);

module.exports = router
