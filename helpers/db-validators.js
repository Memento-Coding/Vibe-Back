const User = require('../database/models/user.model');
const Song = require('../database/models/song.model')

//Verificar si el correo ya existe en la BD
const duplicatedEmail = async(email = '') => {

    const emailInDB = await User.findOne({email});
    if (emailInDB) {
        throw new Error (`El correo electronico: ${email}  ya esta registrado`);
    }
}

//Verificar si existe el usuario con el id enviado en la BD
const userExists = async(id) => {

    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error (`El usuario con id: ${id}  no se encuentra en la BD`);
    }
}

//Validar colecciones permitidas
const permittedCollections = (collection = '', collections = []) =>{
  const included = collections.includes(collection)
  if (!included) {
    throw new Error(`La coleccion ${collection} no es permitida, colecciones permitidas: ${collections}`)
  }
  return true;
}

//Verificar si existe la cancion 
const songExists = async(id) => {
  const getSongId = await Song.findById(id);
  if(!getSongId){
    throw new Error (`La cancion con id: ${id}  no se encuentra en la BD`);
  }
}


  module.exports = {
    duplicatedEmail,
    userExists,
    permittedCollections,
    songExists
  }