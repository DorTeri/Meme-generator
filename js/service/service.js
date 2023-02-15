'use strict'

let gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny'] }
]

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'white'
        } ,
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'white'
        }
    ],
    font: 'Impact'
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].size += num
}

function setFont(font) {
    gMeme.font = font
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function changeLine() {
    if(gMeme.lines.length === 1) return
    if(gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else if(gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function setPlace(lineIdx) {
    switch (lineIdx) {
        case 0: 
        return {x: 200 , y:50}
        case 1: 
        return {x: 200 , y:350}
        default:
        return {x: 200 , y:200}
    }
}

function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
}

function findUrlById(id) {
    return gImgs.find(img => img.id === id)
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function getLineTxt() {
    const idx = gMeme.selectedLineIdx
    return gMeme.lines[idx].txt
}