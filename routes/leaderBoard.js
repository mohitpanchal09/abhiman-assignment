const express = require('express');
const router = express.Router();
const leaderBoardController  = require('../controllers/leaderBoard');

router.get('/leaderboard',leaderBoardController.getLeaderBoard);

module.exports = router