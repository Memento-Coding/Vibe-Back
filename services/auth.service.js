const User = require('../database/models/user.model');
const createUser = async (newUser)=>{
    //TODO: Encriptar password con bcrypt
    const {email,password,username} = newUser;
    const user = new User({
        username,
        email,
        password,
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

module.exports = {
    createUser,

}