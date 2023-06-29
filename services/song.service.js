const Song = require('../database/models/song.model');

const getRandomSongs = async (count) => {
  try {
    const songs = await Song.aggregate([{ $sample: { size: count } }]);
    return songs;
  } catch (error) {
    throw new Error('Error al obtener canciones aleatorias');
  }
};

module.exports = {
  getRandomSongs,
};
