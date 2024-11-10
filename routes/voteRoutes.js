const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/polls/:id/vote', voteController.createVote);

module.exports = router;