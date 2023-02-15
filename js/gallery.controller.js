'use strict'

function onInit() {
    renderGallery()
}

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
    openEditor()
    setImg(id)
    renderMeme()
}

function onOpenGallery() {
    hideEditor()
}

function openEditor() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
}

function hideEditor() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery')
    elEditor.classList.add('hidden')
    elGallery.classList.remove('hidden')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}