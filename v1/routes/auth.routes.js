const { Router } = require('express');
const authController = require('../../controllers/user.controller');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones relacionadas con la autenticación de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Autenticación]
 *     description: Registra un nuevo usuario.
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito.
 *       500:
 *         description: Error al registrar el usuario.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Autenticación]
 *     description: Inicia sesión con las credenciales de usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       500:
 *         description: Error al iniciar sesión.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/login/google:
 *   post:
 *     summary: Inicio de sesión con Google
 *     tags: [Autenticación]
 *     description: Inicia sesión con una cuenta de Google.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       500:
 *         description: Error al iniciar sesión.
 */
router.post('/login/google', authController.login);

/*
router.get('/login/google', authController.loginGoogle);
*/

module.exports = router;

