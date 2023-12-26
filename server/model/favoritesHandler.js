const errorHandler = require('./errorHandler')
let favorites = []

function getFavorites(req, res) {
    res.json({ recipes: favorites })
}

function addToFavorites(req, res) {
    const recipeData = req.body
    favorites.push(recipeData)
    res.send(favorites)
}

function removeFromFavorites(req, res) {
    const recipeId = req.params.recipeId
    const index = favorites.findIndex(recipe => recipe.idMeal == recipeId)

    if (index !== -1) {
        favorites.splice(index, 1)
        res.send(favorites)
    } else {
        errorHandler.handleServerError
    }
}

module.exports = { getFavorites, addToFavorites, removeFromFavorites }
