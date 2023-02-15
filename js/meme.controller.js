'use strict'

const gElCanvas = document.querySelector('#edit-canvas')
const gCtx = gElCanvas.getContext('2d')

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function renderMeme() {
    const meme = getMeme()
    const lines = meme.lines
    const imgUrl = findUrlById(meme.selectedImgId).url
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(lines[0].txt, lines[0].color, lines[0].size , meme.font ,200, 50)
    }
}

function drawText(text, color = white, size, font , x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onChangeSize(num) {
    changeSize(num)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}