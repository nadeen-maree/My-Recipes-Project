const express = require('express')
const path = require('path')
const apiRoutes = require('./server/routes/api')

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', apiRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
