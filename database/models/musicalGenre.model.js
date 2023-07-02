const mongoose = require('mongoose');
const musicalGenreSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    photo:{
        type:String,
        require:true,
        default:"https://vibe-data-structure.s3.amazonaws.com/photo/Default.png",
    }
});

const MusicalGenre = mongoose.model('MusicalGenre', musicalGenreSchema);
module.exports = MusicalGenre;
