const render = new Renderer()
let favorites = []
let recipes = []
let recipeData = {}
let isInFavoritePage = false

$('#searchButton').on('click', function() {
    const ingredient = $('#ingredientInput').val()
    const excludeIngredient = $('#excludeIngredientInput').val()
    const glutenFree = $('#glutenFreeCheckbox').is(':checked')
    const dairyFree = $('#dairyFreeCheckbox').is(':checked')
    isInFavoritePage = false

    $.get(`/recipes/${ingredient}`, {
        glutenFree: glutenFree,
        dairyFree: dairyFree,
        excludeIngredient: excludeIngredient
    }, function(data) {
        recipes = data.recipes.map(recipeData => {
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
        })

       recipes.forEach(recipeData => {
        favorites.find(fav => fav.id == recipeData.id) ? recipeData.isFavorite = true : recipeData.isFavorite = false
       })

        render.renderRecipes(recipes)
    })
})

$('#favoritesBtn').on('click', function() {
    $.get('/favorites', function(data) {
         favorites = data.recipes.map(recipeData => {
            const recipe = new Recipe(
                recipeData.id,
                recipeData.title,
                recipeData.ingredients,
                recipeData.thumbnail,
                recipeData.href
            )
            recipe.chef = `${recipeData.chef}`
            recipe.rate = `${recipeData.rate}`
            return recipe
        })
            const apiRecipeData = favorites
            const favoritesIds = favorites.map(recipe => recipe.id)

            favorites = apiRecipeData.map(recipeData => {
                const isFavorite = favoritesIds.includes(recipeData.id)
                return { ...recipeData, isFavorite }
            })

            isInFavoritePage = true
        render.renderRecipes(favorites)
    })
})

function removeEmojis(text) {
    return text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{2B50}|\u{1F31F}|\u{1F320}]/gu, '')
}

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
        const chef = removeEmojis($recipe.find('#chef-name').text().trim())
        const rate = removeEmojis($recipe.find('#rate').text().trim())
        recipeData = {
            id: recipeId,
            title: title,
            thumbnail: thumbnail,
            href: href,
            ingredients: ingredients,
            chef: chef,
            rate: rate
        }
        console.log(recipeData)
       addToFavorites(recipeData)
    } else if($heartIcon.hasClass('fas')){
        $heartIcon.removeClass('fas').addClass('far')
        removeFromFavorites(recipeId)
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
                return response.json()
            }
            throw new Error('Failed to fetch recipes data')
            })
            .then(data => {
                recipeData.isFavorite = true
                favorites = data
                console.log(data)
            })
        .catch(error => {
            console.error('Error adding recipe to favorites:', error.message)
        })
}

function removeFromFavorites(recipeId) {
    fetch(`/favorites/remove/${recipeId}`, {
        method: 'DELETE'
    })
    .then(response => {
    if (response.ok) {
        return response.json()
    }
    throw new Error('Failed to fetch recipes data')
    })
    .then(data => {
        favorites = data
        const apiRecipeData = favorites
            const favoritesIds = favorites.map(recipe => recipe.id)

            favorites = apiRecipeData.map(recipeData => {
                const isFavorite = favoritesIds.includes(recipeData.id)
                return { ...recipeData, isFavorite }
            })
            
            if(isInFavoritePage){
                render.renderRecipes(favorites)
            }else{
                recipes.forEach(recipeData => {
                    favorites.find(fav => fav.id == recipeData.id) ? recipeData.isFavorite = true : recipeData.isFavorite = false
                })
                render.renderRecipes(recipes)
            }
        
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
