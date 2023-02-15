'use strict'

let gImgs = createImages()

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            txtColor: 'white',
            strokeColor: 'black'
        }
    ],
    font: 'Impact'
}

function addLine() {
    gMeme.lines.push({
        txt: 'Write here',
        size: 20,
        align: 'center',
        color: 'white'
    })
}

function addEmoji(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt += val
}

function search(name) {
    return gImgs.filter(img => img.keywords.some(key => key.includes(name)))
}

function randomMeme() {
    gMeme.selectedImgId = getRandomIntInclusive(1, gImgs.length - 1)
    if (Math.random() > 0.5) addLine()
    gMeme.lines.forEach(line => {
        line.txt = makeLorem(4)
        line.size = getRandomIntInclusive(15, 27)
        line.color = getRandomColor()
    })
}

function removeLine() {
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(gMeme.lines.length - 1, 1)
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
    if (gMeme.lines.length === 1) return
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) gMeme.selectedLineIdx++
    else if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function setPlace(lineIdx) {
    switch (lineIdx) {
        case 0:
            return { x: 200, y: 50 }
        case 1:
            return { x: 200, y: 350 }
        default:
            return { x: 200, y: 200 }
    }
}

function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
}

function findImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setMeme(idx) {
    const memes = loadFromStorage(STORAGE_KEY)
    const meme = memes[idx]
    gMeme.lines = meme.lines
    gMeme.font = meme.lines
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function getLineTxt() {
    const idx = gMeme.selectedLineIdx
    return gMeme.lines[idx].txt
}

function changeAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function createImages() {
    return [
        { id: 1, url: 'images/1.jpg', keywords: ['funny', 'tramp'] },
        { id: 2, url: 'images/2.jpg', keywords: ['cute', 'dog'] },
        { id: 3, url: 'images/3.jpg', keywords: ['cute', 'baby', 'dog'] },
        { id: 4, url: 'images/4.jpg', keywords: ['cat', 'laptop'] },
        { id: 5, url: 'images/5.jpg', keywords: ['victory', 'baby'] },
        { id: 6, url: 'images/6.jpg', keywords: ['funny', 'explain'] },
        { id: 7, url: 'images/7.jpg', keywords: ['baby', 'suprised'] },
        { id: 8, url: 'images/8.jpg', keywords: ['funny', 'watching'] },
        { id: 9, url: 'images/9.jpg', keywords: ['baby', 'laugh'] },
        { id: 10, url: 'images/10.jpg', keywords: ['obama', 'laugh'] },
        { id: 11, url: 'images/11.jpg', keywords: ['kiss', 'funny'] },
        { id: 12, url: 'images/12.jpg', keywords: ['haim', 'point'] },
        { id: 13, url: 'images/13.jpg', keywords: ['wallstreet', 'toast'] },
        { id: 14, url: 'images/14.jpg', keywords: ['scary', 'sunglass'] },
        { id: 15, url: 'images/15.jpg', keywords: ['exactly'] },
        { id: 16, url: 'images/16.jpg', keywords: ['laugh', 'bold'] },
        { id: 17, url: 'images/17.jpg', keywords: ['putin', 'piece'] },
        { id: 18, url: 'images/18.jpg', keywords: ['toystory', 'buz'] },
    ]

}