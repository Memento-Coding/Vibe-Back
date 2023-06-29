const randomSongsService = require('../services/song.service');

const getRandomSongs = async (req, res) => {
  const count = +req.query.count;

  try {
    const songs = await randomSongsService.getRandomSongs(count);
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
  getRandomSongs,
};
