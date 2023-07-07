const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    artist:{
        type:String,
        require:true,
    },
    genre:{
        type:String,
        require:true,
    },
    duration:{
        type:String,
        require:true,
    },
    photo:{
        type:String,
        require:true,
        default:"https://vibe-data-structure.s3.amazonaws.com/default/Default.png",
    },
    file:{
        type:String,
        require:true
    }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
