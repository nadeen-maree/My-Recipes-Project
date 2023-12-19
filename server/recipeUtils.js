function mapRecipes(recipesData) {
    return recipesData.map(recipe => ({
        idMeal: recipe.idMeal,
        title: recipe.title,
        ingredients: recipe.ingredients,
        thumbnail: recipe.thumbnail,
        href: recipe.href
    }))
}
module.exports = { mapRecipes }
