const { Router } = require('express');
const { check } = require('express-validator');
const songController = require('../../controllers/song.controller');
const checkAuth = require('../../middlewares/auth');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Song:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  readonly: true
 *                  description: Id de la cancion
 *              name:
 *                  type: string
 *                  description: Nombre de la cancion
 *              artist:
 *                  type: string
 *                  description: Nombre del artista
 *              genre:
 *                  type: string
 *                  description: Genero musical de la cancion
 *              duration:
 *                  type: string
 *                  description: Duracion en minutos de la cancion
 *              photo:
 *                  type: string
 *                  description: URL de la foto de la cancion
 *              file:
 *                  type: string
 *                  description: URL de la cancion en la BD
 *          required:
 *              - name
 *              - artist
 *              - genre
 *              - duration
 *              - photo
 *              - file
 *          example:
 *              name: Edge
 *              artist: Rezz
 *              genre: Electronica
 *              duration: 3:59
 *              photo: https://vibe-data-structure.s3.amazonaws.com/photo/Ok+Computer.jpg
 *              file: https://vibe-data-structure.s3.amazonaws.com/songs/Radiohead-No-Suprises.mp3
 *              
 *            
 */

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

//GET cancion en la BD
/**
 * @swagger
 * /song/find/{term}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Song]
 *      summary: busqueda de canciones con nombre
 *      description: Este metodo obtiene y lista todas las canciones que concuerden con el termino ingresado.
 *      parameters:
 *        - in: path
 *          name: term
 *          required: true
 *          type: string
 *          description: termino a buscar en la bd
 *      responses:
 *          200:
 *              description: Operacion correcta, cancion(es) con nombre similar/igual obtenida.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/song'
 *          400:
 *              description: Id invalido, cancion no existe en la bd, datos ingresados incorrectamente
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.get('/find/:term', [
  //Validadon token
  checkAuth
],songController.getSongs);


module.exports = router;
