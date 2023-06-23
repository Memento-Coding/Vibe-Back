const { uploadFileToS3 } = require("../helpers/upload-file");
const sharp = require("sharp");
const fs = require("fs");
const userService = require('../services/user.service');

const uploadFile = async (req, res) => {
  try {

    const {id} = req.params;

    let model = await userService.getUserById(id);

    const fileContent = fs.readFileSync(req.files.file.tempFilePath);
    // //Redimensionar imagen
    const buffer = await sharp(fileContent)
      .resize({ height: 640, width: 640, fit: "contain" })
      .toBuffer();
    const controller = await uploadFileToS3(req.files, undefined, buffer);

    model.foto = controller;

    await model.save();

    res.json({controller});
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
};

module.exports = {
  uploadFile,
};
