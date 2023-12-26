const RECIPES_API = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient"

const dairyIngredients = [
    'Heavy Cream',  'Cream', 'Cheese', 'Milk', 'Butter', 'Creme', 'Ricotta', 'Mozzarella',
        'Custard', 'Cream Cheese', 'Yogurt', 'Whey', 'Casein', 'Lactose', 'Ghee'
    ]
const glutenIngredients = [
    'Flour', 'Bread', 'Spaghetti', 'Biscuits', 'Beer', 'Barley', 'Rye',
    'Wheat', 'Pasta', 'Couscous', 'Malt', 'Semolina', 'Bulgur', 'Durum',
    'Farina', 'Matzo', 'Seitan', 'Soy Sauce', 'Communion Wafers'
    ]

const nonVegetarianIngredients = [
    'Meat', 'Poultry', 'Fish', 'Thai fish sauce', 'Salmon', 'Red Snapper', 'Chicken', 'chicken breast', 'Chicken Breasts', 'Chicken Stock', 'chicken stock', 'Beef', 'Shellfish', 'Gelatin', 'Lard', 'Rennet', 'Broth', 'Anchovies', 'Cochineal/Carmine',
    'Isinglass', 'Oleic acid', 'Oyster sauce', 'Worcestershire sauce', 'Beef tallow', 'Chicken fat', 'Fish sauce',
    'Oyster extract', 'Pork gelatin', 'Suet', 'Tallow', 'Veal', 'Glycerides', 'Squalene', 'Shellac', 'Carmine', 'Gelatin'
]

const nonVeganIngredients = [
    'Egg', 'Eggs', 'Honey', 'Whey', 'Casein', 'Lard', 'Ghee', 'Isinglass', 'Carmine', 'Shellac', 'Cochineal','Glycerin'
] + dairyIngredients + nonVegetarianIngredients

const sensitives = {
    dairy: dairyIngredients,
    gluten: glutenIngredients,
    vegetarian: nonVegetarianIngredients,
    vegan: nonVeganIngredients
}

const MAX_RATE = 5


module.exports = {RECIPES_API, sensitives, MAX_RATE}