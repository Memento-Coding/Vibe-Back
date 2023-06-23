const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenSign = async (usuario)=>{
    const {username,foto,_id} = usuario;
    return jwt.sign(
        {
            username,
            foto,
            _id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"6h"
        }
    );
}

module.exports = {
    tokenSign
}