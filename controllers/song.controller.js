const songService = require('../services/song.service');

const getSongs = async(req, res) => {
  try {
    const { term } = req.params;
    const newTerm = term.split('+').join(' ');
    const songs = await songService.getSongs(newTerm);
    
    res.json({
        songs
    })
  } catch (error) {
    console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
  }
}

const getRandomSongs = async (req, res) => {
  const count = +req.query.count;

  try {
    const songs = await songService.getRandomSongs(count);
    const simplifiedSongs = songs.map(song => ({
      nombre: song.nombre,
      artista: song.artista,
      foto: song.foto
    }));
    res.json(simplifiedSongs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener canciones aleatorias' });
  }
};

module.exports = {
  getSongs,
  getRandomSongs,
};
