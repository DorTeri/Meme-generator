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
            color: 'red'
        }
    ]
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

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}