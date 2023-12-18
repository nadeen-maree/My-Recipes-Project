const dairyIngredients = [
                        "Heavy Cream",  "Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella",
                        "Custard", "Cream Cheese", "Yogurt", "Whey", "Casein", "Lactose", "Ghee"
                        ]
const glutenIngredients = [
                        "Flour", "Bread", "Spaghetti", "Biscuits", "Beer", "Barley", "Rye",
                        "Wheat", "Pasta", "Couscous", "Malt", "Semolina", "Bulgur", "Durum",
                        "Farina", "Matzo", "Seitan", "Soy Sauce", "Communion Wafers"
                        ]

function filterRecipesByIngredients(recipesData, { glutenFree, dairyFree }) {
    
    return recipesData.filter(recipe => {
        if (dairyFree && recipe.ingredients.some(ingredient => dairyIngredients.includes(ingredient))) {
            return false
        }
        if (glutenFree && recipe.ingredients.some(ingredient => glutenIngredients.includes(ingredient))) {
            return false
        }
        return true
    })
}

module.exports = { filterRecipesByIngredients }