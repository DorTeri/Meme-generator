'use strict'

const STORAGE_KEY = 'memes'
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
        drawRect()
        drawArc()
    }
}

function renderEmojies() {
    const emojies = getEmojies()
    const elEmojies = document.querySelector('.emojies')
    let strHTML = ''
    emojies.forEach(emoji => {
        strHTML += `<button onclick="onAddEmoji('${emoji}')" class="emoji">${emoji}</button>`
    })
    elEmojies.innerHTML = strHTML
}

function drawText(text, txtColor, strokeClr, size, font, align, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeClr
    gCtx.fillStyle = txtColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    const x = gMeme.lines[lineIdx].x
    const y = gMeme.lines[lineIdx].y
    setPos(x, y, gCtx.measureText(text).width, lineIdx,size)
    gCtx.fillText(text, x, y, gElCanvas.width)
    gCtx.strokeText(text, x, y, gElCanvas.width)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangePage(num) {
    changePage(num)
    renderEmojies()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onChangeStroke(color) {
    changeStroke(color)
    renderMeme()
}

function onAddEmoji(val) {
    const lineIdx = addLine(val)
    setPlace(lineIdx)
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
    const lineIdx = addLine()
    setPlace(lineIdx)
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

function onSaveImage() {
    const meme = getMeme()
    meme.imgUrl = gElCanvas.toDataURL('image/jpeg')
    let images = loadFromStorage(STORAGE_KEY)
    !images ? images = [meme] : images.push(meme)
    saveToStorage(STORAGE_KEY, images)
    flashMsg(`<h2>saved</h2><i class="fa-regular fa-floppy-disk"></i>`)
}

function onOpenColor() {
    const colorPicker = document.querySelector('input[name="color-picker"]')
    colorPicker.focus()
    colorPicker.value = '#ffffff'
    colorPicker.click()
}

function onOpenStroke() {
    const colorPicker = document.querySelector('input[name="color-stroke"]')
    colorPicker.focus()
    colorPicker.value = '#000000'
    colorPicker.click()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}