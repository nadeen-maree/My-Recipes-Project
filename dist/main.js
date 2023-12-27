const render = new Renderer()
let favorites = []
let recipes = []
let recipeData = {}
let isInFavoritePage = false

$('#searchButton').on('click', handleSearch)
$('#favoritesBtn').on('click', showFavorites)
$('body').on('click', '.favoriteButton', handleFavoriteButtonClick)
$('body').on('click', '.shareButton', handleShareButtonClick)
$('#pages').on('click', '#previous-page', handlePreviousButtonClick)
$('#pages').on('click', '#next-page', handleNextButtonClick)
