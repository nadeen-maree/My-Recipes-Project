function handleSearch() {
    const ingredient = $('#ingredientInput').val()
    const excludeIngredient = $('#excludeIngredientInput').val()
    const glutenFree = $('#glutenFreeCheckbox').is(':checked')
    const dairyFree = $('#dairyFreeCheckbox').is(':checked')
    const vegetarian = $('#vegetarianCheckbox').is(':checked')
    const vegan = $('#veganCheckbox').is(':checked')
    isInFavoritePage = false

    $.get(`/recipes/${ingredient}`, {
        glutenFree,
        dairyFree,
        vegetarian,
        vegan,
        excludeIngredient
    }, handleSearchResults)
}

function handleSearchResults(data) {
    recipes = data.recipes.map(parseRecipeData)

    recipes.forEach(recipeData => {
        favorites.find(fav => fav.idMeal == recipeData.idMeal) ? recipeData.isFavorite = true : recipeData.isFavorite = false
    })
    
    render.renderRecipes(recipes)
}
