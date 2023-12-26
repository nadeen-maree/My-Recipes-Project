const express = require('express')
const router = express.Router()
const favoritesHandler = require('../model/favoritesHandler')

router.get('/', favoritesHandler.getFavorites)
router.post('/add', favoritesHandler.addToFavorites)
router.delete('/remove/:recipeId', favoritesHandler.removeFromFavorites)

module.exports = router
