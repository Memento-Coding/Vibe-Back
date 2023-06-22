const User = require('../database/models/user.model');

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
// const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{
//   const incluida = colecciones.includes(coleccion)
//   if (!incluida) {
//     throw new Error(`La coleccion ${coleccion} no es permitida, colecciones permitidas: ${colecciones}`)
//   }
//   return true;
// }


  module.exports = {
    duplicatedEmail,
    userExists
  }