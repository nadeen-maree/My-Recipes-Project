const sensitivityUtilities = require('./sensitivityUtilities')

function filterRecipesByIngredients(recipesData, { glutenFree, dairyFree, vegetarian, vegan }) {
    const arrSensitivities = []

    if (dairyFree) {
        arrSensitivities.push('dairy')
    }

    if (glutenFree) {
        arrSensitivities.push('gluten')
    }

    if (vegetarian){
        arrSensitivities.push('vegetarian')
    }

    if (vegan){
        arrSensitivities.push('vegan')
    }

    return sensitivityUtilities.filterRecipesBySensitivities(arrSensitivities, recipesData)
}

module.exports = { filterRecipesByIngredients }
