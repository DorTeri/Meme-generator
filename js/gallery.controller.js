'use strict'

let showMenu = false;
let gClickedWord
let gStartPos

function onInit() {
    addListeners()
    renderGallery()
    renderEmojies()
    renderKeyWords()
}

function renderGallery(images = getImages()) {
    const elGallery = document.querySelector('.gallery-content')
    let strHTML = ''
    images.forEach(img => {
        strHTML += `<img src=${img.url} onclick="onImgSelect(${img.id})">`
    })
    elGallery.innerHTML = strHTML
}

function onRenderMemes() {
    hideEditor()
    const memes = loadFromStorage(STORAGE_KEY)
    const elGallery = document.querySelector('.gallery-content')
    let strHTML = ''
    memes.forEach((meme, i) => {
        strHTML += `<img src=${meme.imgUrl} onclick="onMemeSelect(${i})">`
    })
    elGallery.innerHTML = strHTML
}

function addListeners() {
    addTouchListeners()
    addMouseListeners()
}

function onMemeSelect(idx) {
    setMeme(idx)
    renderMeme()
    openEditor()
}

function onImgSelect(id) {
    openEditor()
    setImg(id)
    renderMeme()
}

function onOpenGallery() {
    hideEditor()
    renderGallery()
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
    if (gClickedWord === name) return
    gClickedWord = name
    const images = search(name)
    if (!images || images.length === 0) return
    changeWordSize(name)
    renderKeyWords()
    renderGallery(images)
}

function onSearchByName(name) {
    const images = search(name)
    renderGallery(images)
}

function toggleMenu() {
    const btn = document.querySelector('.menu-btn')
    if (!showMenu) {
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

function renderKeyWords() {
    let words = loadFromStorage('KeyWords')
    if (!words) words = createKeyWords()
    const elWordsContainer = document.querySelector('.words-container')
    let strHTML = ''
    words.forEach(word => {
        strHTML += `<p onclick="onSearch('${word.word}')" class="key-word" style="font-size: ${word.count}px">${word.word}</p>`
    })
    elWordsContainer.innerHTML = strHTML
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const lineIdx = isLineClicked(pos)
    if (lineIdx < 0 || gLineDragIdx === undefined) return
    gMeme.selectedLineIdx = lineIdx
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    if (gLineDragIdx < 0 || gLineDragIdx === undefined) return
    const isDrag = gMeme.lines[gLineDragIdx].isDrag
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    if (gLineDragIdx === undefined || gLineDragIdx < 0) return
    setLineDrag(false)
    document.body.style.cursor = 'default'
}

function onClick(ev) {
    const pos = getEvPos(ev)
    const lineIdx = isLineClicked(pos)
    if (lineIdx < 0) return
    gMeme.selectedLineIdx = lineIdx
    document.getElementById("txt-input").focus()
}

function flashMsg(msg) {
    document.querySelector('.flash-msg h3').innerText = msg
    const elFlash = document.querySelector('.flash-msg')
    elFlash.classList.add('open-msg')
    setTimeout(() => {
        elFlash.classList.remove('flash')
    }, 1500);
}