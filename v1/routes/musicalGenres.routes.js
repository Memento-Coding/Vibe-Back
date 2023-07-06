const {Router} = require('express');
const musicalGenreController = require("../../controllers/musicalGenre.controller");
const checkAuth = require('../../middlewares/auth');
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      MusicalGenre:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  description: Id del genero musical
 *              name:
 *                  type: string
 *                  description: Nombre del genero musical
 *              description:
 *                  type: string
 *                  description: Descripcion del genero musical
 *              photo:
 *                  type: string
 *                  description: Foto del genero musical
 *          required:
 *              - name
 *              - description
 *              - photo
 *          example:
 *              name: Pop
 *              description: Pop es un término inglés que deriva de popular. Se trata de un adjetivo que se aplica al arte, sobre todo al musical, orientado al consumo masivo gracias a sus características. Por lo general, las creaciones pop son simples y superficiales, lo que permite una asimilación inmediata por parte de las personas. La música pop, en este sentido, está formada por composiciones simples y de fácil comercialización. Suelen ser temas breves, con un estribillo que se repite y que es sencillo de recordar, sin grandes fragmentos instrumentales.
 *              photo: https://vibe-data-structure.s3.amazonaws.com/photo/Default.png
 */

//GET obtener todos los generos musicales en la bd
/**
 * @swagger
 * /musicalGenre:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [MusicalGenre]
 *      summary: listar generos musicales
 *      description: Este metodo obtiene y lista todos los generos musicales de la bd
 *      responses:
 *          200:
 *              description: Operacion correcta, lista de generos musicales obtenida.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  genres:
 *                                      $ref: '#/components/schemas/MusicalGenre'
 *                                      
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.get('/', [
    checkAuth
], musicalGenreController.getAllGenres);

module.exports = router