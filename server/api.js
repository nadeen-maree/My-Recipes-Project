const axios = require('axios')

const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"

function fetchRecipes(ingredient) {
    const apiUrl = `${RECIPES_API}${ingredient}`
    return axios.get(apiUrl)
}

module.exports = { fetchRecipes }
