function handleFavoriteButtonClick() {
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
            idMeal: recipeId,
            title: title,
            thumbnail: thumbnail,
            href: href,
            ingredients: ingredients,
            chef: chef,
            rate: rate
        }
        console.log(recipeData)
        addToFavorites(recipeData)
    } else if ($heartIcon.hasClass('fas')) {
        $heartIcon.removeClass('fas').addClass('far')
        removeFromFavorites(recipeId)
    }
}

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
            const favoritesIds = favorites.map(recipe => recipe.idMeal)

            favorites = apiRecipeData.map(recipeData => {
                const isFavorite = favoritesIds.includes(recipeData.idMeal)
                return { ...recipeData, isFavorite }
            })
            
            if(isInFavoritePage){
                render.renderRecipes(favorites)
            }else{
                recipes.forEach(recipeData => {
                    favorites.find(fav => fav.idMeal == recipeData.idMeal) ? recipeData.isFavorite = true : recipeData.isFavorite = false
                })
                render.renderRecipes(recipes)
            }
        
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}