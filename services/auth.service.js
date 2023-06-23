const User = require('../database/models/user.model');
const bcrypt = require('bcrypt');
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

const login = async (newUser)=>{
    const {emailOrUser,password} = newUser;
    try {
        const userFound = await User.findOne().or([{email:emailOrUser},{username:emailOrUser}]);
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

const existUser = async (id)=>{
    try {
        const userFound = await User.findById(id);
        return userFound;
    } catch (error) {
        return error;
        
    }
}

module.exports = {
    createUser,
    login,
    existUser

}