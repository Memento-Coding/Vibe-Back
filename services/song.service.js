const Song = require("../database/models/song.model");
const { diacriticSensitiveRegex } = require("../helpers/diacriticRegex");

const getSongById = async (id) => {
  const song = Song.findById(id);    

  return song;
}

const getSongs = async(term) => {
  const getSongs =  Song.find({
    name: {$regex: diacriticSensitiveRegex(term), $options: 'i'}
  });

  return getSongs;
};

const createaSong = async(song)=>{
  const {name,artist,genre,duration,photo,file} = song;
    const newSong = new Song({
      name,
      artist,
      genre,
      duration,
      photo,
      file
    })
    await newSong.save();
    return true;
}
const getRandomSongs = async (count) => {
  try {
    const songs = await Song.aggregate([{ $sample: { size: count } }]);
    return songs;
  } catch (error) {
    throw new Error("Error al obtener canciones aleatorias" + error);
  }
};

module.exports = {
  getSongById,
  getSongs,
  getRandomSongs,
  createaSong
};
