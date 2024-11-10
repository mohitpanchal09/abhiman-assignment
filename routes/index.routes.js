const express = require('express')
const routes = express.Router();
const pollRoutes = require('./pollRoutes')
const userRoutes = require('./userRoutes')
const voteRoutes = require('./voteRoutes')
const leaderBoard = require('./leaderBoard')


routes.use('/api',pollRoutes)
routes.use('/api',userRoutes)
routes.use('/api',voteRoutes)
routes.use('/api',leaderBoard)


module.exports = routes