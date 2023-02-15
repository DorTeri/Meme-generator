'use strict'

const gElCanvas = document.querySelector('#edit-canvas')
const gCtx = gElCanvas.getContext('2d')

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function renderMeme() {
    const meme = getMeme()
    const imgUrl = findImgById(meme.selectedImgId).url
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) =>
            drawText(line.txt, line.txtColor, line.strokeColor, line.size, meme.font, line.align, idx))
        changeTxtInput()
    }
}

function drawText(text, txtColor, strokeClr, size, font, align, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeClr
    gCtx.fillStyle = txtColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    const { x, y } = setPlace(lineIdx)
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

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onChangeLine() {
    changeLine()
    changeTxtInput()
}

function onChangeAlign(align) {
    changeAlign(align)
    renderMeme()
}

function selectLine() {
    document.querySelector
}

function changeTxtInput() {
    const txt = getLineTxt()
    document.querySelector('input[name="txt"]').value = txt
}