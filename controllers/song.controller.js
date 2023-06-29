const songService = require('../services/song.service');

const getSongs = async(req, res) => {
    const { term } = req.params;
    const songs = await songService.getSongs(term);
    
    res.json({
        results: songs
    })
}

module.exports = {
    getSongs
}