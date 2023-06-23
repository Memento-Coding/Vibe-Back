const { uploadFileToS3 } = require("../helpers/upload-file");
const sharp = require("sharp");
const fs = require("fs");
const userService = require('../services/user.service');
const { deleteFileFromS3 } = require("../helpers/delete-file");

const uploadFile = async (req, res) => {
  try {

    const {id} = req.params;

    let model = await userService.getUserById(id);

    const splitter = model.foto.split('/');
    const fileName = splitter[splitter.length -1];

    const fileContent = fs.readFileSync(req.files.file.tempFilePath);

    // //Redimensionar imagen
    const buffer = await sharp(fileContent)
      .resize({ height: 640, width: 640, fit: "contain" })
      .toBuffer();

    await deleteFileFromS3(fileName)
    const url = await uploadFileToS3(req.files, undefined, buffer);

    model.foto = url;

    await model.save();

    res.json({url});
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
};

const deleteFile = async (req, res) => {

  try {
    const {id} = req.params;
  
    let model = await userService.getUserById(id);
  
    const splitter = model.foto.split('/');
    const fileName = splitter[splitter.length -1];
  
    await deleteFileFromS3(fileName)
    model.foto = "https://img.freepik.com/free-icon/user_318-159711.jpg"

    model.save();

    res.json({msg: 'Foto de perfil eliminada con exito'});

  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
}

module.exports = {
  uploadFile,
  deleteFile
};
