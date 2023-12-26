const  configs  = require('../../configs')
const sensitivesMap = configs.sensitives

class SensitivityUtilities {
    static filterRecipesBySensitivities(arrSensitivities, recipes) {
        return recipes.filter((recipe) => !this.isContainingSensitivities(arrSensitivities, recipe))
    }

    static isContainingSensitivities = (arrSensitivities, recipe) => {
        for (let ingredient of recipe.ingredients) {
            if (this.isIngredientContainSensitivity(ingredient, arrSensitivities)) {
                return true
            }
        }
        return false
    }

    static isIngredientContainSensitivity = (ingredient, arrSensitivities) => {
        for (let sensitivity of arrSensitivities) {
            if (sensitivesMap[sensitivity].includes(ingredient)) {
                return true
            }
        }
        return false
    }
}

module.exports = SensitivityUtilities