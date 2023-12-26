function handleServerError(err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
}


function handleClientError(err, req, res, next) {
    console.error(err.stack)
    res.status(404).send({error: 'Recipe not found in favorites'})
}

module.exports = { handleServerError, handleClientError }
