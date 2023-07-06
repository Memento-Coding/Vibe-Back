const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields');
const songController = require('../../controllers/song.controller');
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


module.exports = router;
