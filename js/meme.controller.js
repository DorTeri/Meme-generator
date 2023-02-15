'use strict'

const gElCanvas = document.querySelector('#edit-canvas')
const gCtx = gElCanvas.getContext('2d')

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function renderMeme() {
    const meme = getMeme()
    // const lineIdx = meme.selectedLineIdx
    const imgUrl = findUrlById(meme.selectedImgId).url
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx ) => 
        drawText(line.txt, line.color, line.size , meme.font ,idx))
        changeTxtInput()
    }
}

function drawText(text, color, size, font, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    const {x ,y} = setPlace(lineIdx)
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

function onChangeLine() {
    changeLine()
    changeTxtInput()
}

function selectLine() {
    document.querySelector
}

function changeTxtInput() {
    const txt = getLineTxt()
    document.querySelector('input[name="txt"]').value = txt 
}