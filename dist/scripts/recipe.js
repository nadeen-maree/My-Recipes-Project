class Recipe {
    constructor(idMeal, title, ingredients, thumbnail, href) {
        this.idMeal = idMeal
        this.title = title
        this.ingredients = ingredients
        this.thumbnail = thumbnail
        this.href = href
        this.isFavorite = false
        this.chef = ""
        this.rate = 0
    }
}