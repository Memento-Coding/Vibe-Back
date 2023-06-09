const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database/connection');
const routerUser = require('./v1/routes/user.routes');
const routerImage = require('./v1/routes/image.routes');
const routerSong = require('./v1/routes/song.routes');
const routerAuth = require('./v1/routes/auth.routes');
const musicalGenre = require('./v1/routes/musicalGenres.routes');
const swaggerConfig = require('./v1/routes/swagger.js');
require('dotenv').config();

db.connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/v1/user', routerUser);
app.use('/v1/image', routerImage);
app.use('/v1/song', routerSong);
app.use('/v1/musicalGenre', musicalGenre);
app.use('/v1',routerAuth);

swaggerConfig(app);

app.listen(process.env.PORT || 3030, () => {
    console.log("Server running in port " + process.env.PORT);
})


