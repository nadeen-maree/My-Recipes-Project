const express = require('express')
const path = require('path')
const recipeHandler = require('./server/recipeHandler')
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/recipes/:ingredient', recipeHandler.handleRecipes)

const favorites = []

app.get('/favorites', (req, res) => {
    res.json({ recipes: favorites })
})

app.post('/favorites/add', (req, res) => {
    const recipeData = req.body
    favorites.push(recipeData)
    res.sendStatus(200)
})

app.delete('/favorites/remove/:recipeId', (req, res) => {
    const { recipeId } = req.params
    const index = favorites.findIndex(recipe => recipe.id == recipeId)
    if (index !== -1) {
        favorites.splice(index, 1)
        res.sendStatus(200)
    } else {
        res.status(404).send('Recipe not found in favorites')
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
