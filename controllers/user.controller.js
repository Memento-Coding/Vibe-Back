const userService = require('../services/user.service');
const generateToken = require('../helpers/generateToken');
require('dotenv').config();

const userGetMyPlaylist = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await userService.getUserPlaylistById(userId);
        for (let index = 0; index < response.MyPlaylist.length; index++) {
            response.MyPlaylist[index].seq = index + 1;
        }

        res.json({
            response
        })
    } catch (error) {

    }
}

const userGetMyMusicalGenres = async (req, res) => {
    try {
        const userId = req.user.id;

        const response = await userService.getUserMusicalGenresById(userId);

        res.json({
            response
        })
    } catch (error) {

    }
}

const register = (req, res) => {
    const { email, password, username } = req.body;
    const user = {
        username,
        email,
        password
    }
    const response = userService.createUser(user);
    if (response) {
        res.status(201).send({
            message: "Usuario Registrado",
        })
    } else {
        res.send(response);
    }
}

const registerGoogle = (req, res) => {
    const { displayName, email, photoURL } = req.body;

    try {
        const userFound = userService.getUserByEmail(email);
        if (userFound) {
            return res.status(409).json({ error: 'El usuario ya existe', redirect: false });
        }
        const nuevoUsuario = {
            username: displayName,
            email,
            foto: photoURL,
        };
        const response = userService.createUserWithGoogle(nuevoUsuario);
        if (response) {
            res.status(201).send({
                message: "Usuario registrado exitosamente",
                redirect: true
            })
        } else {
            res.json({
                response,
                redirect: false
            });
        }

    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        res.status(500).json({ error: 'Error al registrar el usuario', redirect: false });

    }

}



const userPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...user } = req.body;

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


const favoriteSong = async (req, res) => {

}

const login = async (req, res) => {
    const { emailOrUser, password } = req.body;
    const user = {
        emailOrUser,
        password
    }
    const isLoggedIn = await userService.login(user);
    if (isLoggedIn == null) {
        res.status(401).send({
            message: "Datos incorrectos"
        });
    } else {
        if (isLoggedIn.flag) {
            const token = await generateToken.tokenSign(isLoggedIn?.user);
            res.status(200).send({
                token,
            });
            return;
        }
    }
}
const userPatchPlaylist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { songId } = req.params;
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

const userPatchMyMusicalGenres = async (req, res) => {
    try {
        const userId = req.user.id;
        const { musicalGenresArray } = req.body;
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

const loginGoogle = async (req,res)=>{
    const {tokenId} = req.body;
    try {
        const responseGoogle = await userService.googleSignIn(tokenId);
        if(responseGoogle.flag){
            res.status(200).send({flag:true,token:responseGoogle.token});
        }else{
            res.status(401).send({flag:false, message:"Ups! algo ha ocurrido"});
        }
    } catch (error) {
        res.status(401).send({error})
    }
}


module.exports = {
    register,
    login,
    userPut,
    userPatchPlaylist,
    userGetMyPlaylist,
    userPatchMyMusicalGenres,
    userGetMyMusicalGenres,
    registerGoogle,
    loginGoogle
}