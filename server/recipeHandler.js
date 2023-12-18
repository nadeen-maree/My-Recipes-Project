const { fetchRecipes } = require('./api')
const { filterRecipesByIngredients } = require('./ingredients')
const { mapRecipes } = require('./recipeUtils')

function handleRecipes(req, res, next) {
    const { ingredient } = req.params
    const { glutenFree, dairyFree } = req.query

    fetchRecipes(ingredient)
        .then(response => {
            const recipesData = response.data.results
            let filteredRecipes = mapRecipes(recipesData)

            if (glutenFree === 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { glutenFree: true })
            }

            if (dairyFree === 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { dairyFree: true })
            }

            res.json({ recipes: filteredRecipes })
        })
        .catch(error => {
            next(error)
        })
}

module.exports = { handleRecipes }
