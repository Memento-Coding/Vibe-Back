const {Router} = require('express');
const songController = require('../../controllers/song.controller');
const router = Router();

router.get('/:term', songController.getSongs);

module.exports = router;