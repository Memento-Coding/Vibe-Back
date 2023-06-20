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

module.exports = {
    createUser,

}