const { Router } = require('express');
const { check } = require('express-validator');
const { getRandomSongs } = require('../../controllers/song.controller');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Song
 */

/**
 * @swagger
 * /song/random/{count}:
 *   get:
 *     summary: Obtener canciones aleatorias
 *     tags: [Song]
 *     description: Obtiene un número específico de canciones aleatorias.
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         description: Número de canciones a obtener.
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Canciones aleatorias obtenidas con éxito.
 *       500:
 *         description: Error al obtener canciones aleatorias.
 */
router.get('/random/:count', [
  check('count', 'El número de canciones debe ser un entero positivo').isInt({ min: 1 }),
], getRandomSongs);

module.exports = router;
