const { uploadFileToS3 } = require("../helpers/upload-file");
const sharp = require("sharp");
const fs = require("fs");
const { deleteFileFromS3 } = require("../helpers/delete-file");
const { directoryDefiner } = require("../helpers/bucketDirectory");

const uploadFile = async (req, res) => {
  try {

    const {collection, id} = req.params;

    const informationModel = await directoryDefiner(collection, id); 

    if(!informationModel.model){
      return res.status(400).json({
        msg: `No existe el id: ${id} en la coleccion ${collection}`
    });
    }

    const splitter = informationModel.model.photo.split('/');
    const fileName = splitter[splitter.length -1];

    const fileContent = fs.readFileSync(req.files.file.tempFilePath);

    // //Redimensionar imagen
    const buffer = await sharp(fileContent)
      .resize({ height: 640, width: 640, fit: "contain" })
      .toBuffer();

    await deleteFileFromS3(fileName, informationModel.directory)
    const url = await uploadFileToS3(req.files, undefined, buffer, informationModel.directory);

    informationModel.model.photo = url;

    await informationModel.model.save();

    res.json({url});
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg: "Peticion incorrecta" });
  }
};

const deleteFile = async (req, res) => {

  try {
    const {collection, id} = req.params;
  
    const informationModel = await directoryDefiner(collection, id);

    if(!informationModel.model){
      return res.status(400).json({
        msg: `No existe el id: ${id} en la coleccion ${collection}`
    });
    }
  
    const splitter = informationModel.model.photo.split('/');
    const fileName = splitter[splitter.length -1];
  
    await deleteFileFromS3(fileName, informationModel.directory)
    if (collection === "user") {
      informationModel.model.photo = "https://img.freepik.com/free-icon/user_318-159711.jpg"
    } else if(collection == "song") {
      informationModel.model.photo = "https://vibe-data-structure.s3.amazonaws.com/photo/Default.png"
    }

    await informationModel.model.save();

    res.json({msg: 'Foto eliminada con exito'});

  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
}

module.exports = {
  uploadFile,
  deleteFile
};
