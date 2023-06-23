const {verifyToken} = require('../helpers/verify-jwt');
const userService = require('../services/auth.service');
const checkAuth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const existeUsuario = await userService.existUser(tokenData?._id);
        if (!existeUsuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            });
        }
        next();
    } catch (error) {
        res.status(401);
        res.send({error:"Sin autorizacion"})
    }
}

module.exports = checkAuth