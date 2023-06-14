const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.listen(process.env.PORT || 3030, () => {
    console.log("Server running in port " + process.env.PORT);
})


