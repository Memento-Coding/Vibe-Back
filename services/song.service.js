const Song = require("../database/models/song.model");

const getSongs = async(term) => {
  //Expresion regular para hacer que la busqueda sea insensible a mayus y minus
  const regex = new RegExp(term, "i");
  const getSongs = await Song.find({
    nombre: regex,
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
  getSongs,
  getRandomSongs,
  createaSong
};
