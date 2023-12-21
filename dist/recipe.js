class Recipe {
    constructor(id, title, ingredients, thumbnail, href) {
        this.id = id
        this.title = title
        this.ingredients = ingredients
        this.thumbnail = thumbnail
        this.href = href
        this.isFavorite = false
        this.chef = ""
        this.rate = 0
    }
}