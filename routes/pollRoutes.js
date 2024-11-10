const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollsController');

router.post('/polls', pollController.createPoll);
router.get('/polls', pollController.getAllPolls);
router.get('/polls/:id', pollController.getPoll);

module.exports = router;
