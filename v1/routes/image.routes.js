const {Router} = require('express');
const { check } = require('express-validator');
const fileUpload = require('express-fileupload');
const imageController = require('../../controllers/image.controller');
const { validateFields } = require('../../middlewares/validate-fields');
const { verifyFile } = require('../../middlewares/verify-file');
const { permittedCollections, userExists, songExists } = require('../../helpers/db-validators');
const checkAuth = require('../../middlewares/auth');
const router = Router();

router.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}))

//PUT actualizar foto
/**
 * @swagger
 * /image/{collection}/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      tags: [Imagen]
 *      summary: Actualizar foto (de perfil o de cancion)
 *      description: Este metodo actualiza la foto
 *      parameters:
 *          - in: path
 *            name: collection
 *            description: coleccion a usar en la bd
 *            required: true
 *            type: string
 *          - in: path
 *            name: id
 *            description: id de cancion o usuario
 *            required: true
 *            type: string
 *            format: uuid
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          key:
 *                              type: string
 *                              required: true
 *                          file:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: foto actualizada.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              url:
 *                                  type: string
 *          400:
 *              description: Id invalido - Usuario/Cancion no existe en la bd - coleccion no permitida - tipo de archivo no permitido            
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.put('/:collection/:id', [
    //Validando token
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    verifyFile,
    check('collection').custom( c => permittedCollections (c, ['user', 'song'])),
    validateFields
], imageController.uploadFile)

//DELETE eliminar foto
/**
 * @swagger
 * /image/{collection}/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags: [Imagen]
 *      summary: Eliminar foto (de perfil o de cancion)
 *      description: Este metodo elimina una foto
 *      parameters:
 *          - in: path
 *            name: collection
 *            description: coleccion a usar en la bd
 *            required: true
 *            type: string
 *          - in: path
 *            name: id
 *            description: id de cancion o usuario
 *            required: true
 *            type: string
 *            format: uuid
 *      responses:
 *          200:
 *              description: foto eliminada.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *          400:
 *              description: Id invalido - Usuario/Cancion no existe en la bd - coleccion no permitida - tipo de archivo no permitido            
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.delete('/:collection/:id', [
    //Validando token
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check('collection').custom( c => permittedCollections (c, ['user', 'song'])),
    validateFields
], imageController.deleteFile)

module.exports = router