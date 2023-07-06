const {Router} = require('express');
const userController = require('../../controllers/user.controller');
const router = Router();

router.post('/register',userController.register);
router.post('/login', userController.login);
router.post('/login/google', userController.loginGoogle);
router.post('/register/google',userController.registerGoogle);

module.exports = router
