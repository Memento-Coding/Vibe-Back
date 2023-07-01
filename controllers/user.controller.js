const userService = require('../services/user.service');
const generateToken= require('../helpers/generateToken');
const { default: axios } = require('axios');

const userGetMyPlaylist = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const response = await userService.getUserPlaylistById(userId);
        
        for (let index = 0; index < response.MyPlaylist.length; index++) {
            response.MyPlaylist[index].seq = index+1;
        }
        
        res.json({
            response
        })
    } catch (error) {
        
    }
}

const userGetMyMusicalGenres = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const response = await userService.getUserMusicalGenresById(userId);
        
        res.json({
            response
        })
    } catch (error) {
        
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
    try {
        const {id} = req.params;
        const {...user} = req.body;

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

const userPatchPlaylist = async(req, res) => {
    try {
        const userId = req.user.id;
        const {songId} = req.params;
        await userService.updateMyPlaylist(userId, songId)
        res.json({
            userId,
            songId,
            msg: "Cancion agregada a mis favoritos."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const userPatchMyMusicalGenres = async(req, res) => {
    try {
        const userId = req.user.id;
        const {musicalGenresArray} = req.body;
        console.log(musicalGenresArray);
        await userService.updateMyMusicalGenres(userId, musicalGenresArray)
        res.json({
            msg: "Genero(s) agregado(s) con exito.",
            musicalGenresArray
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}



module.exports = {
    register,
    login,
    userPut,
    userPatchPlaylist,
    userGetMyPlaylist,
    userPatchMyMusicalGenres,
    userGetMyMusicalGenres
}