const mongoose = require('mongoose');
const songSchema = mongoose.Schema({
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
    duration:{
        type:String,
        require:true,
    },
    photo:{
        type:String,
        require:true,
        default:"https://vibe-data-structure.s3.amazonaws.com/photo/Default.png",
    },
    year:{
        type:String,
        require:true,
    }
})

export default mongoose.model('Song',songSchema);