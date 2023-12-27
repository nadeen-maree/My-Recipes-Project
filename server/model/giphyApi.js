const configs = require('../../configs')

function fetchGif(word) {
    return new Promise((resolve, reject) => {
        const apiUrl = `${configs.GIPHY_URL}${configs.REQUEST_EXTENSION}${word}${configs.API_KEY_EXTENSION}${configs.MY_API_KEY}`
    
        fetch(apiUrl)
          .then(response => {
            if (response.ok) {
              return response.json()
            }
            throw new Error('Failed to fetch gif')
          })
          .then(data => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
}

module.exports = { fetchGif }