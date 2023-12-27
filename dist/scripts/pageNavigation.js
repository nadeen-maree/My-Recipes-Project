let currentPage = 1
const limit = 5


function handlePreviousButtonClick(){
    if(currentPage > 1){
        currentPage--
        handleSearch(currentPage)
    }
}

function handleNextButtonClick(){
    const totalPages = Math.ceil(recipes.length / limit)
    if(currentPage < totalPages){
        currentPage++
        handleSearch(currentPage)
    }
}

