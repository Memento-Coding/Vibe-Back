const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    MyPlaylist: [{
        seq: {
            type: Number,
            default: 0
        },
        cancion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    }],
    MisGeneros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MusicalGenre"
    }],
    foto: {
        type: String,
        require: false,
        default: "https://img.freepik.com/free-icon/user_318-159711.jpg",

    },
}, {
    timestamps: true
}

);

const User = mongoose.model('User', userSchema);
module.exports = User;