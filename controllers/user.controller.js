const User = require('../database/models/user.model');
const userService = require('../services/auth.service');
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
}