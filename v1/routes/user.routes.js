const {Router} = require('express');
const { check } = require('express-validator');
const userController = require('../../controllers/user.controller');
const { userExists, duplicatedEmail, songExists } = require('../../helpers/db-validators');
const { validateFields } = require('../../middlewares/validate-fields');
const checkAuth = require('../../middlewares/auth');
const router = Router();

router.post('/register', [
    //Validar que el campo usuario no este vacio
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    //Validar que el campo contraseña no este vacio
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    //Validar la longitud minima de la contraseña
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
        min: 6,
    }),
    //Validar que el correo electronico sea un formato valido
    check("email", "El correo no es valido").isEmail(),
    //Validar que el correo electronico no exista en la BD
    check("email").custom(duplicatedEmail),

    validateFields,
], userController.register);

router.put('/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),

    //Llamando nuestro middleware para que se ejecute.
    validateFields
        
], userController.userPut);

router.patch('/:songId', [
    //Validando token
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("songId", "No es un ID valido").isMongoId(),
    //Validar que el id de la cancion exista en la bd
    check("songId").custom(songExists),

    validateFields
], userController.userPatchPlaylist)

router.patch('/add/musicalgenres', [
    checkAuth,
], userController.userPatchMyMusicalGenres)


router.get('/myPlaylist', [
    //Validando token
    checkAuth,
], userController.userGetMyPlaylist)

router.get('/myMusicalGenres', [
    //Validando token
    checkAuth,
], userController.userGetMyMusicalGenres)

module.exports = router
