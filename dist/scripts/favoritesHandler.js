function showFavorites() {
    $.get('/favorites', handleFavoritesData)
}

function handleFavoritesData(data) {
    favorites = data.recipes.map(parseRecipeData)

    const favoritesIds = favorites.map(recipe => recipe.idMeal)
    favorites = favorites.map(recipeData => {
        const isFavorite = favoritesIds.includes(recipeData.idMeal)
        return { ...recipeData, isFavorite }
    })

    isInFavoritePage = true
    render.renderRecipes(favorites)
}
