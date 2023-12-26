const express = require('express')
const router = express.Router()
const recipeHandler = require('../model/recipeHandler')

router.get('/:ingredient', recipeHandler.handleRecipes)

module.exports = router
