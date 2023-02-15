
renderGallery()
function renderGallery() {
    const elGallery = document.querySelector('.gallery-content')
    const images = getImages()
    let strHTML = ''
    images.forEach(img => {
        strHTML += `<img src=${img.url} onclick="onImgSelect(${img.id})">`
    })
    elGallery.innerHTML = strHTML
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
}