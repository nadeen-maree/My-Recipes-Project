const axios = require('axios')
const configs = require('../../configs')

function fetchRecipes(ingredient, page, limit) {
    const apiUrl = `${configs.RECIPES_API}/${ingredient}?page=${page}&limit=${limit}`
    return axios.get(apiUrl)
}

module.exports = { fetchRecipes }
