const {Router} = require('express');
const musicalGenreController = require("../../controllers/musicalGenre.controller");
const router = Router();

router.get('/', musicalGenreController.getAllGenres);

module.exports = router