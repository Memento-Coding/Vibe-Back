const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database/connection');
const routerUser = require('./v1/routes/user.routes');
require('dotenv').config();

db.connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/v1/user',routerUser);


app.listen(process.env.PORT || 3030, () => {
    console.log("Server running in port " + process.env.PORT);
})


