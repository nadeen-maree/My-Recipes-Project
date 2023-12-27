const SUBJECT = `subject=Check%20out%20this%20recipe!%20`
const BODY = `You%20can%20see%20the%20recipe%20in%20this%20video%20%3A%20`

function handleShareButtonClick(){
    const recipeTitle = $(this).data('title')
    const videoLink = $(this).data('video')

    const mailtoLink = `mailto:?subject=${SUBJECT}${recipeTitle}&body=${BODY}${videoLink}`

    window.open(mailtoLink, '_blank')

}