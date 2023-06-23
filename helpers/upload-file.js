const { v4: uuidv4 } = require('uuid');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../helpers/s3-connection');

const uploadFileToS3 = (files , validExtensions = ["png", "jpg", "jpeg"], buffer) => {

  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    //Acceder a la ultima posicion del arreglo cortado por el split.
    const extension = splitName[splitName.length - 1];

    //Validar la extension
    if (!validExtensions.includes(extension)) {
      return reject(`La extension ${extension} no es permitida, solo se admiten: ${validExtensions}`,)
    }

    const newName = uuidv4() + "." + extension;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "photo/" + newName,
      Body: buffer,
      
    }
    
    const command = new PutObjectCommand(params);

    s3.send(command, function(err, data) {
      if (err) {
        reject(err);
        console.log(err, err.stack); // an error occurred
      } 
      else{
        resolve(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/photo/${newName}`);
      }
    });;
  });
};

module.exports = {
  uploadFileToS3
};
