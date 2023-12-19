const render = new Renderer()

$('#searchButton').on('click', function() {
    const ingredient = $('#ingredientInput').val()
    const excludeIngredient = $('#excludeIngredientInput').val()
    const glutenFree = $('#glutenFreeCheckbox').is(':checked')
    const dairyFree = $('#dairyFreeCheckbox').is(':checked')

    $.get(`/recipes/${ingredient}`, {
        glutenFree: glutenFree,
        dairyFree: dairyFree,
        excludeIngredient: excludeIngredient
    }, function(data) {
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

$('#favoritesBtn').on('click', function() {
    $.get('/favorites', function(data) {
        const favoritesRecipes = data.recipes.map(recipeData => new Recipe(
                recipeData.id,
                recipeData.title,
                recipeData.ingredients,
                recipeData.thumbnail,
                recipeData.href
            ))
            const apiRecipeData = favoritesRecipes
            const favoritesIds = favorites.map(recipe => recipe.id)

            const recipesWithFavorites = apiRecipeData.map(recipeData => {
                const isFavorite = favoritesIds.includes(recipeData.id)
                return { ...recipeData, isFavorite }
            })

        render.renderRecipes(recipesWithFavorites)
    })
})

let recipeData = {}
const favorites = []
$('body').on('click', '.favoriteButton', function() {
    const $heartIcon = $(this).find('i')
    const recipeId = $(this).data('recipe-id')

    if ($heartIcon.hasClass('far')) {
        $heartIcon.removeClass('far').addClass('fas')
        const $recipe = $(this).closest('.recipe')
        const title = $recipe.find('h3 a').text()
        const thumbnail = $recipe.find('img').attr('src')
        const href = $recipe.find('h3 a').attr('href')
        const ingredients = []
        $recipe.find('.ingredients-list li').each(function() {
            ingredients.push($(this).text())
        })

        recipeData = {
            id: recipeId,
            title: title,
            thumbnail: thumbnail,
            href: href,
            ingredients: ingredients
        }
        console.log(recipeData)
       addToFavorites(recipeData)
    } else if($heartIcon.hasClass('fas')){
        $heartIcon.removeClass('fas').addClass('far')
        removeFromFavorites(recipeData)
    }
})

function addToFavorites(recipeData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    }
    fetch('/favorites/add', requestOptions)
        .then(response => {
            if (response.ok) {
                recipeData.isFavorite = true
                console.log('Recipe added to favorites')
                favorites.push(recipeData)
                console.log('Favorites Array:', favorites)
            } else {
                throw new Error('Failed to add recipe to favorites')
            }
        })
        .catch(error => {
            console.error('Error adding recipe to favorites:', error.message)
        })
}

function removeFromFavorites(recipeData) {
    fetch(`/favorites/remove/${recipeData.id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const index = favorites.findIndex(recipe => recipe.id === recipeData.id)
            if (index !== -1) {
                recipeData.isFavorite = false
                favorites.splice(index, 1)
                console.log('Recipe removed from favorites:', recipeData.id)
            }
        } else {
            console.error('Error removing recipe from favorites')
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
