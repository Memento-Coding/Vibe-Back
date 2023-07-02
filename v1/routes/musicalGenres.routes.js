const { Router } = require('express');
const musicalGenreController = require("../../controllers/musicalGenre.controller");
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Género Musical
 *   description: Operaciones relacionadas con géneros musicales
 */

/**
 * @swagger
 * /musicalgenres:
 *   get:
 *     summary: Obtener todos los géneros musicales
 *     tags: [Género Musical]
 *     description: Obtiene todos los géneros musicales disponibles.
 *     responses:
 *       200:
 *         description: Géneros musicales obtenidos con éxito.
 *       500:
 *         description: Error al obtener los géneros musicales.
 */
router.get('/', musicalGenreController.getAllGenres);

module.exports = router;
