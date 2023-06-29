const userService = require('../services/user.service');

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

const login = (req,res)=>{
    
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

module.exports = {
    register,
    login,
    userPut
}