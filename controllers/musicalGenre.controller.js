const musicalService = require('../services/musicalGenre.service');

const getAllGenres = async(req, res) => {

    try {
        const genres = await musicalService.getGenres();

        res.json({
            genres: genres
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
} 

module.exports = {
    getAllGenres
}