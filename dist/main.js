const render = new Renderer()

$('#searchButton').on('click', function() {
    const ingredient = $('#ingredientInput').val()
    const glutenFree = $('#glutenFreeCheckbox').is(':checked')
    const dairyFree = $('#dairyFreeCheckbox').is(':checked')

    $.get(`/recipes/${ingredient}?glutenFree=${glutenFree}&dairyFree=${dairyFree}`, function(data) {
        const recipes = data.recipes.map(recipeData => new Recipe(
            recipeData.idMeal,
            recipeData.title,
            recipeData.ingredients,
            recipeData.thumbnail,
            recipeData.href
        ))

        render.renderRecipes(recipes)
    })
})
