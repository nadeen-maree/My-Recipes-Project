const { fetchRecipes } = require('./RecipeApi')
const { fetchGif } = require('./giphyApi')
const { filterRecipesByIngredients } = require('./ingredients')
const { recipeData } = require('./recipeUtils')
const configs = require('../../configs')
const { error } = require('jquery')


function handleRecipes(req, res, next) {
    const { ingredient } = req.params
    const { glutenFree, dairyFree, vegetarian, vegan, excludeIngredient } = req.query
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let recipesData = []
    
    fetchRecipes(ingredient, page, limit)
        .then((response) => {
            
            recipesData = response.data.results

            const recipesInPage = recipesData.slice(startIndex, endIndex)

            const gifPromises = recipesInPage.map((recipe) => {
                return fetchGif(configs.FOOD)
                .then((gif)=> {
                    for (let i = 0; i < recipesInPage.length; i++){
                        recipesInPage.forEach((recipe, index) => {
                        recipe.thumbnail = gif.data[index].embed_url
                        })
                    }
                        return recipe
                })
                
                .catch((error) => {
                    console.error('Error fetching Gif:', error)
                    return recipe
                })
            })
                return Promise.all(gifPromises)
        })
        .then((recipeWithGif) => {
            
            let filteredRecipes = recipeData(recipeWithGif)

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

            res.json({ 
                recipes: filteredRecipes,
                totalPages: Math.ceil(recipesData.length / limit),
                currentPage: page
            })
        })
        .catch((error) => {
            next(error)
        })
}

module.exports = { handleRecipes }

