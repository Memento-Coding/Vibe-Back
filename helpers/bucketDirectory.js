const userService = require('../services/user.service');
const songService = require('../services/song.service');

const directoryDefiner = async(collection, id) => {
    
    try {
        let bucketDirectory;
        let modelDefiner;
    
        if(collection === "song"){
            bucketDirectory = "photo/"
            modelDefiner = await songService.getSongById(id);
          } else if (collection === "user"){
            bucketDirectory = "profile/"
            modelDefiner = await userService.getUserById(id);
          }
    
        return { directory: bucketDirectory, model: modelDefiner}
    } catch (error) {
        
    }
  
}

module.exports = {
    directoryDefiner
}