const {Router} = require('express');
const { check } = require('express-validator');
const fileUpload = require('express-fileupload');
const imageController = require('../../controllers/image.controller');
const { validateFields } = require('../../middlewares/validate-fields');
const { verifyFile } = require('../../middlewares/verify-file');
const { permittedCollections, userExists } = require('../../helpers/db-validators');
const router = Router();

router.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
})),

/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: Operaciones relacionadas con imágenes
 */

/**
 * @swagger
 * /images/{collection}/{id}:
 *   put:
 *     summary: Subir imagen
 *     tags: [Imágenes]
 *     description: Sube una imagen a una colección específica.
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         description: Nombre de la colección.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del elemento relacionado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida con éxito.
 *       400:
 *         description: Error al subir la imagen.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/:collection/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),
    verifyFile,
    check('collection').custom( c => permittedCollections (c, ['user'])),
    validateFields,
],imageController.uploadFile)

/**
 * @swagger
 * /images/{collection}/{id}:
 *   delete:
 *     summary: Eliminar imagen
 *     tags: [Imágenes]
 *     description: Elimina una imagen de una colección específica.
 *     parameters:
 *       - in: path
 *         name: collection
 *         required: true
 *         description: Nombre de la colección.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del elemento relacionado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen eliminada con éxito.
 *       400:
 *         description: Error al eliminar la imagen.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/:collection/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),
    check('collection').custom( c => permittedCollections (c, ['user'])),
    validateFields
], imageController.deleteFile)

module.exports = router