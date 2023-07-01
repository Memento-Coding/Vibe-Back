const MusicalGenre = require('../database/models/musicalGenre.model');

const getGenres = async () => {
    const getMusicalGenres = await MusicalGenre.find();

    return getMusicalGenres;
}

module.exports = {
    getGenres
}