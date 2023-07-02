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

const login = async (newUser)=>{
    const {emailOrUser,password} = newUser;
    try {
        const userFound = await User.findOne().or([{email:emailOrUser},{username:emailOrUser}]);
        if(userFound == null){
            return null;
        }
        const isPassword = bcrypt.compare(password, userFound.password);
        if(!userFound && !isPassword){
            return false;
        }
        return {
            flag:true,
            user:userFound,
        };
    } catch (error) {
        return error;
    }
    
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    login
}