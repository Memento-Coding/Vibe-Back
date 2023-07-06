const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields');
const songController = require('../../controllers/song.controller');
const checkAuth = require('../../middlewares/auth');

const multer = require('multer');
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage:storage,fileFilter:(req,file,cb)=>{
  if(file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3'){
    cb(null,true);
  }else{
    cb(new Error('Solo se permiten archivos MP3'),false);
  }
} });
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

router.get('/:term', songController.getSongs);
router.post('/file', upload.single('song'),songController.uploadSong);
router.post('/',[
  check("name", "El nombre de la canción es obligatorio").not().isEmpty(),
  check("artist", "El artista de la canción es obligatorio").not().isEmpty(),
  check("genre", "El genero de la canción es obligatorio").not().isEmpty(),
  check("duration", "La duración de la canción es obligatorio").not().isEmpty(),
  check("file", "El archivo mp3 de la canción es obligatorio").not().isEmpty(),
  validateFields,
],songController.createSong);

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
