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

router.put('/:collection/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),
    verifyFile,
    check('collection').custom( c => permittedCollections (c, ['user'])),
    validateFields,
],imageController.uploadFile)

router.delete('/:collection/:id', [
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),
    check('collection').custom( c => permittedCollections (c, ['user'])),
    validateFields
], imageController.deleteFile)

module.exports = router