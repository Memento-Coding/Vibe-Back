const moongose = require('mongoose');

const connectDb = async ()=>{
    try {
        await moongose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@vibe.hvlysgq.mongodb.net/vibe?retryWrites=true&w=majority`);
        console.log("BD conectada");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectDb,
}
