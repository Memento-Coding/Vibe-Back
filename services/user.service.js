const User = require('../database/models/user.model');
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
    const user = User.findById(id);

    return user;
}

const createUser = async (newUser)=>{
    //TODO: Encriptar password con bcrypt
    const {email,password,username} = newUser;
    const passwordHash = await bcrypt.hash(password,10);
    const user = new User({
        username,
        email,
        password: passwordHash,
        MyPlaylist: [],
        MisGeneros: []
    });
    try {
        await user.save();
        return true;
    } catch (error) {
        return error;
    }
}
//TODO: validacion de contrasenia antigua para poder cambiar a una nueva contrasenia
const updateUser = async(id, user) => {
    if (user.password){
        user.password = bcrypt.hashSync(user.password, 10)
    }

    const updatebd = await User.findByIdAndUpdate(id, user);

    return updatebd;
}

module.exports = {
    createUser,
    updateUser,
    getUserById

}