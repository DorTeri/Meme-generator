'use strict'

let showMenu = false;

function onInit() {
    renderGallery()
}

function renderGallery(images = getImages()) {
    const elGallery = document.querySelector('.gallery-content')
    let strHTML = ''
    images.forEach(img => {
        strHTML += `<img src=${img.url} onclick="onImgSelect(${img.id})">`
    })
    elGallery.innerHTML = strHTML
}

function onShowMemes() {
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.memes-container').classList.remove('hidden')
    const memes = loadFromStorage(STORAGE_KEY)
    const elMemes = document.querySelector('.memes-container')
    let strHTML = ''
    memes.forEach(meme => {
        const img = findImgById(meme.selectedImgId)
        strHTML += `<img src=${img.url} onclick="onImgSelect(${img.url})">`
    })
    elMemes.innerHTML = strHTML
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
    const elGallery = document.querySelector('.gallery-container')
    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
}

function hideEditor() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.gallery-container')
    elEditor.classList.add('hidden')
    elGallery.classList.remove('hidden')
}

function onRandomMeme() {
    randomMeme()
    openEditor()
    renderMeme()
}

function onSearch(name) {
    const images = search(name)
    if(!images || images.length === 0) return
    renderGallery(images)
}

function toggleMenu() {
    const btn = document.querySelector('.menu-btn')
    if(!showMenu) {
        btn.classList.add("close");
        document.body.classList.add('menu-open')
        document.querySelector('.screen-content').classList.add('open-content')
    } else {
        btn.classList.remove("close");
        document.body.classList.remove('menu-open')
        document.querySelector('.screen-content').classList.remove('open-content')
    }
    showMenu = !showMenu
}