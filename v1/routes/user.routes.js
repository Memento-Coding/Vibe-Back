const {Router} = require('express');
const { check } = require('express-validator');
const userController = require('../../controllers/user.controller');
const { userExists, duplicatedEmail, songExists } = require('../../helpers/db-validators');
const { validateFields } = require('../../middlewares/validate-fields');
const checkAuth = require('../../middlewares/auth');
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  readonly: true
 *                  description: Id del usuario
 *              username:
 *                  type: string
 *                  description: Nombre de usuario
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Correo electronico del usuario
 *              password:
 *                  type: string
 *                  format: password
 *                  description: Clave del usuario
 *              MyPlaylist:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          seq:
 *                              type: number
 *                              description: variable de conteo
 *                          cancion:
 *                              $ref: '#/components/schemas/Song'
 *              MisGeneros:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/MusicalGenre'
 *              photo:
 *                  type: string
 *                  description: URL de la foto de perfil del usuario
 *          required:
 *              - username
 *              - email
 *              - password
 *          example:
 *              username: john12_5-2W
 *              email: johnrick@gmail.com
 *              password: $2a$10$bEqiCtsGDHGUTYfsdfgyIUPcioQedPcvq8TSm29qZDhzknUYq9mfZWMEaz
 *              MyPlaylist: [{seq: 1, cancion: ObjectId:('6321sb2130ff9')}]
 *              MisGeneros: [{ObjectId:('6783294as40ff12')}]
 *              foto: "https://img.freepik.com/free-icon/user_318-159711.jpg"
 */             

//GET canciones en la playlist del usuario
/**
 * @swagger
 * /user/myPlaylist:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: listar canciones de MyPlaylist
 *      description: Este metodo obtiene y lista todas las canciones de un usuario en MyPlaylist
 *      responses:
 *          200:
 *              description: Operacion correcta, lista de canciones obtenida.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  seq:
 *                                      type: number
 *                                  cancion:
 *                                      $ref: '#/components/schemas/Song'
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.get('/myPlaylist', [
    //Validando token
    checkAuth,
], userController.userGetMyPlaylist)


//GET generos musicales del usuario
/**
 * @swagger
 * /user/myMusicalGenres:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: listar generos musicales
 *      description: Este metodo obtiene y lista todos los generos musicales de un usuario en MisGeneros
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
 *                                  MisGeneros:
 *                                      $ref: '#/components/schemas/MusicalGenre'
 *                                      
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.get('/myMusicalGenres', [
    //Validando token
    checkAuth,
], userController.userGetMyMusicalGenres)

router.post('/register', [
    //Validar que el campo usuario no este vacio
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    //Validar que el campo contraseña no este vacio
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    //Validar la longitud minima de la contraseña
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
        min: 6,
    }),
    //Validar que el correo electronico sea un formato valido
    check("email", "El correo no es valido").isEmail(),
    //Validar que el correo electronico no exista en la BD
    check("email").custom(duplicatedEmail),

    validateFields,
], userController.register);

//PUT actualizar usuario
/**
 * @swagger
 * /user/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: Actualizar usuario (username, email, password)
 *      description: Este metodo actualiza el username, email y password del usuario
 *      parameters:
 *          - name: id
 *            in: path
 *            description: ID del usuario
 *            required: true
 *            type: string
 *            format: uuid
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      email:
 *                          type: string
 *                          format: email
 *                      password:
 *                          type: string
 *      responses:
 *          200:
 *              description: Usuario actualizado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                                  format: email
 *                              password:
 *                                  type: string
 *          400:
 *              description: Id invalido - Usuario no existe en la bd - Datos ingresados incorrectamente             
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.put('/:id', [
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("id", "No es un ID valido").isMongoId(),
    //Validar que el id exista en la bd
    check("id").custom(userExists),
    //Validar la longitud minima de la contraseña
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
        min: 6,
    }),
    //Validar que el correo electronico sea un formato valido
    check("email", "El correo no es valido").isEmail(),
    //Validar que el correo electronico no exista en la BD
    check("email").custom(duplicatedEmail),

    //Llamando nuestro middleware para que se ejecute.
    validateFields
        
], userController.userPut);

//PATCH actualizar arreglo MyPlaylist (agregar cancion favorita)
/**
 * @swagger
 * /user/{songId}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: Actualizar MyPlaylist
 *      description: Este metodo agrega una nueva cancion a la playlist de favoritos del usuario (MyPlaylist)
 *      parameters:
 *          - name: songId
 *            in: path
 *            description: ID de la cancion
 *            required: true
 *            type: string
 *            format: uuid
 *      responses:
 *          200:
 *              description: Cancion agregada con exito.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userId:
 *                                  type: string
 *                                  format: uuid
 *                              songId:
 *                                  type: string
 *                                  format: uuid
 *                              msg:
 *                                  type: string
 *          400:
 *              description: Id invalido - Cancion no existe en la bd - Datos ingresados incorrectamente                                      
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.patch('/:songId', [
    //Validando token
    checkAuth,
    //Validando que el id enviado sea de MONGODB.
    check("songId", "No es un ID valido").isMongoId(),
    //Validar que el id de la cancion exista en la bd
    check("songId").custom(songExists),

    validateFields
], userController.userPatchPlaylist)

//PATCH actualizar arreglo MisGeneros (agregar generos musicales)
/**
 * @swagger
 * /user/add/musicalgenres:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: Actualizar MisGeneros
 *      description: Este metodo agrega genero(s) a la lista MisGeneros
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      musicalGenresArray:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: uuid
 *      responses:
 *          200:
 *              description: Genero(s) agregada con exito.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                              musicalGenresArray:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                      format: uuid
 *          400:
 *              description: Id invalido - Genero musical no existe en la bd - Datos ingresados incorrectamente                                      
 *          401:
 *              description: Sin autorizacion, por favor ingrese el token.
 *          500:
 *              description: Error en el servidor.
 *                                              
 *                              
 */
router.patch('/add/musicalgenres', [
    checkAuth,
], userController.userPatchMyMusicalGenres)



module.exports = router
