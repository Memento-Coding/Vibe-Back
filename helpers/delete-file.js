const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../helpers/s3-connection');

const deleteFileFromS3 = async (fileName) => {
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: "profile/" + fileName,
        }
    
        const command = new DeleteObjectCommand(params)
        await s3.send(command)
        
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

module.exports = {
    deleteFileFromS3
}