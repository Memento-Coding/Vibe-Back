const userService = require('../services/user.service');
const generateToken= require('../helpers/generateToken');

const register = (req,res)=>{
    const {email,password,username} = req.body;
    const user = {
        username,
        email,
        password
    }
    const response = userService.createUser(user);
    if(response){
        res.status(201).send({
            message:"Usuario Registrado",
        })
    }else{
        res.send(response);
    }
}

const userPut = async(req, res) => {
    const {id} = req.params;
    const {...user} = req.body;
    try {
        await userService.updateUser(id, user)
        res.json({
            id,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const favoriteSong = async(req, res) => {

}

const login = async (req,res)=>{
    const {emailOrUser,password} = req.body;
    const user = {
        emailOrUser,
        password
    }
    const isLoggedIn = await userService.login(user);
    console.log(isLoggedIn?.user._id);
    if(isLoggedIn.flag){
        const token = await generateToken.tokenSign(isLoggedIn?.user);
        res.status(200).send({
            token,
        });
        return;
    }
    res.status(401).send({
        message:"Datos incorrectos"
    });
}

module.exports = {
    register,
    login,
    userPut
}