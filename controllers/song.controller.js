const songService = require('../services/song.service');
const s3 = require('../helpers/s3-connection');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
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

const uploadSong = async (req,res)=>{
  if (!req.file) {
    res.status(400).send('No se encontró un archivo en la solicitud');
    return;
  }
  const file = req.file;

  // Crea un objeto para el archivo en S3
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "songs/"+file.originalname,
    Body: file.buffer,
  };

  try{
    await s3.send(new PutObjectCommand(params));
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "songs/"+file.originalname,
    };
    const url = await getSignedUrl(s3, new GetObjectCommand(getObjectParams));
    const urlWithoutParams = url.split('?')[0];
    res.send({ url:urlWithoutParams });

  }catch(error){
    console.error("Error al subir el archivo a S3:", error);
    res.status(500).send("Error al subir el archivo a S3");

  }
}

const createSong = async (req,res)=>{
  
}

const getRandomSongs = async (req, res) => {
  const count = +req.query.count;
  try {
    const songs = await songService.getRandomSongs(count);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener canciones aleatorias' });
  }
};

module.exports = {
  getSongs,
  getRandomSongs,
  uploadSong
};
