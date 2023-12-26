const express = require('express')
const router = express.Router()

const recipeRoutes = require('./recipes')
const favoritesRoutes = require('./favorites')
const errorHandler = require('../model/errorHandler')

router.use('/recipes', recipeRoutes)
router.use('/favorites', favoritesRoutes)

router.use(errorHandler.handleServerError)

module.exports = router
