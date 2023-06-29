const Song = require('../database/models/song.model');

const getSongs = async(term) => {
    //Expresion regular para hacer que la busqueda sea insensible a mayus y minus
    const regex = new RegExp(term, 'i');
    const getSongs = await Song.find({
        nombre: regex
    });

    return getSongs;
}

module.exports = {
    getSongs
}