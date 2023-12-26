function parseRecipeData(recipeData) {
    const recipe = new Recipe(
        recipeData.idMeal,
        recipeData.title,
        recipeData.ingredients,
        recipeData.thumbnail,
        recipeData.href
    )
    recipe.chef = `${recipeData.chef}`
    recipe.rate = `${recipeData.rate}`
    return recipe
}

function removeEmojis(text) {
    return text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{2B50}|\u{1F31F}|\u{1F320}]/gu, '')
}
