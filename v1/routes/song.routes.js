const { Router } = require('express');
const { check } = require('express-validator');
const songController = require('../../controllers/song.controller');
const multer = require('multer');
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /song:
 *   get:
 *     summary: Obtener canciones aleatorias
 *     tags: [Song]
 *     description: Obtiene un número específico de canciones aleatorias.
 *     parameters:
 *       - in: query
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
router.get('/', [
  check('count', 'El número de canciones debe ser un entero positivo').isInt({ min: 1 }),
], songController.getRandomSongs);

/**
 * @swagger
 * /song/{term}:
 *   get:
 *     summary: Buscar canciones por término
 *     tags: [Song]
 *     description: Busca canciones que coincidan con el término proporcionado.
 *     parameters:
 *       - in: path
 *         name: term
 *         required: true
 *         description: Término de búsqueda.
 *         schema:
 *           type: string
 *     responses:
 *        200:
 *          description: Canciones encontradas con éxito.
 *        500:
 *          description: Error al buscar canciones.
 */
router.get('/:term', songController.getSongs);

/**
 * @swagger
 * /song:
 *   post:
 *     summary: Subir canción
 *     tags: [Song]
 *     description: Sube una canción al servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: string
 *                 format: binary
 *             required:
 *               - song
 *     responses:
 *       201:
 *         description: Canción subida con éxito.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error al subir la canción.
 */
router.post('/', upload.single('song'), songController.uploadSong);

module.exports = router;
