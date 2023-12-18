const express = require('express')
const path = require('path')
const recipeHandler = require('./server/recipeHandler')
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/recipes/:ingredient', recipeHandler.handleRecipes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
