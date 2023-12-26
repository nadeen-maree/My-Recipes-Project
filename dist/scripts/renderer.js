class Renderer {
    renderRecipes(recipes) {
        const recipesContainer = $('#recipesContainer')
        const source = $('#recipe-template').html()
        const template = Handlebars.compile(source)

        recipesContainer.html(template({ recipes }))

        $('.recipe img').on('click', function() {
            const recipeIndex = $(this).closest('.recipe').index()
            const clickedRecipe = recipes[recipeIndex]

            if (clickedRecipe && clickedRecipe.ingredients.length > 0) {
                const firstIngredient = clickedRecipe.ingredients[0]
                alert(`First Ingredient: ${firstIngredient}`)
            }
        })
    }
}