const User = require('../database/models/user.model');
const bcrypt = require('bcrypt');

const getUserById = async (id) => {
    const user = User.findById(id);    

    return user;
}

const getUserPlaylistById = async (id) => {
    const userPlaylist = User.findById(id).populate('MyPlaylist.cancion').select('MyPlaylist');    

    return userPlaylist;
}

const getUserMusicalGenresById = async (id) => {
    const userMusicalGenres = User.findById(id).populate('MisGeneros').select('MisGeneros');    

    return userMusicalGenres;
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

const updateMyPlaylist = async(id, songId) => {

    const updatePlaylist = await User.findByIdAndUpdate(id, {
        $push: {MyPlaylist: {cancion: songId}}
    });

    return updatePlaylist;
}

const updateMyMusicalGenres = async(id, musicalGenresArray) => {

    const updatePlaylist = await User.findByIdAndUpdate(id, {
        $push: {MisGeneros: { $each: musicalGenresArray }}
    });

    return updatePlaylist;
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



module.exports = {
    getUserById,
    createUser,
    updateUser,
    login,
    updateMyPlaylist,
    updateMyMusicalGenres,
    getUserPlaylistById,
    getUserMusicalGenresById
}