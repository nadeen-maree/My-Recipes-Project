const { faker } = require('@faker-js/faker')

function mapRecipes(recipesData) {
    return recipesData.map(recipe => ({
        idMeal: recipe.idMeal,
        title: recipe.title,
        ingredients: recipe.ingredients,
        thumbnail: recipe.thumbnail,
        href: recipe.href
    }))
}

function recipeData(recipesData){
    mapRecipes(recipesData)
    return recipesData.map(recipe => ({
        ...recipe, 
        chef: faker.person.firstName() + ' ' + faker.person.lastName(),
        rate: Math.floor(Math.random()*5)+1

    }))
}
module.exports = { recipeData }
