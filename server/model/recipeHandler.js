const { fetchRecipes } = require('./RecipeApi')
const { filterRecipesByIngredients } = require('./ingredients')
const { recipeData } = require('./recipeUtils')

function handleRecipes(req, res, next) {
    const { ingredient } = req.params
    const { glutenFree, dairyFree, vegetarian, vegan, excludeIngredient } = req.query

    fetchRecipes(ingredient)
        .then((response) => {
            const recipesData = response.data.results
            let filteredRecipes = recipeData(recipesData)

            if (glutenFree === 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { glutenFree: true })
            }

            if (dairyFree === 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { dairyFree: true })
            }

            if (vegetarian === 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { vegetarian: true })
            }

            if (vegan == 'true') {
                filteredRecipes = filterRecipesByIngredients(filteredRecipes, { vegan: true })
            }
            if (excludeIngredient) {
                filteredRecipes = filteredRecipes.filter((recipe) => !recipe.ingredients.includes(excludeIngredient))
            }

            res.json({ recipes: filteredRecipes })
        })
        .catch((error) => {
            next(error)
        })
}

module.exports = { handleRecipes }

