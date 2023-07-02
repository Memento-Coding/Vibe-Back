const {Router} = require('express');
const { check } = require('express-validator');
const userController = require('../../controllers/user.controller');
const { userExists, duplicatedEmail, songExists } = require('../../helpers/db-validators');
const { validateFields } = require('../../middlewares/validate-fields');
const checkAuth = require('../../middlewares/auth');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Usuario]
 *     description: Registra un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               username: usuario1
 *               password: contraseña123
 *               email: usuario1@example.com
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Error en los datos enviados.
 *       500:
 *         description: Error en el servidor.
 */
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

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuario]
 *     description: Actualiza los datos de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               username: usuario1
 *               password: contraseña123
 *               email: usuario1@example.com
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       400:
 *         description: Error en los datos enviados.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),

    //Llamando nuestro middleware para que se ejecute.
    validateFields
        
], userController.userPut);

/**
 * @swagger
 * /user/{songId}:
 *   patch:
 *     summary: Agregar canción a la lista de reproducción
 *     tags: [Usuario]
 *     description: Agrega una canción a la lista de reproducción del usuario.
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         description: ID de la canción a agregar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Canción agregada a la lista de reproducción con éxito.
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: Acceso no autorizado.
 *       404:
 *         description: Usuario o canción no encontrados.
 *       500:
 *         description: Error en el servidor.
 */
router.patch('/:songId', [
    //Validando token
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("songId", "No es un ID valido").isMongoId(),
    //Validar que el id de la cancion exista en la bd
    check("songId").custom(songExists),

    validateFields
], userController.userPatchPlaylist)

/**
 * @swagger
 * /user/add/musicalgenres:
 *   patch:
 *     summary: Agregar géneros musicales al perfil de usuario
 *     tags: [Usuario]
 *     description: Agrega géneros musicales al perfil de un usuario.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Géneros musicales agregados con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.patch('/add/musicalgenres', [
    checkAuth,
], userController.userPatchMyMusicalGenres)

/**
 * @swagger
 * /user/myPlaylist:
 *   get:
 *     summary: Obtener lista de reproducción del usuario
 *     tags: [Usuario]
 *     description: Obtiene la lista de reproducción del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reproducción obtenida con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/myPlaylist', [
    //Validando token
    checkAuth,
], userController.userGetMyPlaylist)

/**
 * @swagger
 * /user/myMusicalGenres:
 *   get:
 *     summary: Obtener géneros musicales del usuario
 *     tags: [Usuario]
 *     description: Obtiene los géneros musicales del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Géneros musicales obtenidos con éxito.
 *       401:
 *         description: Acceso no autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/myMusicalGenres', [
    //Validando token
    checkAuth,
], userController.userGetMyMusicalGenres)

module.exports = router
