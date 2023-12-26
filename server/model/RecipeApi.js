const axios = require('axios')
const configs = require('../../configs')

function fetchRecipes(ingredient) {
    const apiUrl = `${configs.RECIPES_API}/${ingredient}`
    return axios.get(apiUrl)
}

module.exports = { fetchRecipes }
