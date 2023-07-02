const { S3Client} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
    region:"us-east-1",
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
  });
module.exports = s3Client;