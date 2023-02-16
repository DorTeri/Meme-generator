'use strict'
const PAGE_SIZE = 3
const gEmojies = createEmojies()

let gLineDragging = false
let gLineDragIdx
let gImgs = createImages()
let gPageIdx = 0
let gSearchKeyWords

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            txtColor: 'white',
            strokeColor: 'black',
            x: 200,
            y: 50,
            isDrag: false
        }
    ],
    font: 'Impact'
}

function createKeyWords() {
    const words = [
        { word: 'funny', count: 23 },
        { word: 'baby', count: 25 },
        { word: 'cute', count: 12 },
        { word: 'dog', count: 31 },
        { word: 'laugh', count: 15 }
    ]
    saveToStorage('KeyWords', words)
    return words
}

function addLine() {
    gMeme.lines.push({
        txt: 'Write here',
        size: 20,
        align: 'center',
        color: 'white',
        x: 1,
        y: 1,
    })
    return gMeme.lines.length - 1
}

function getGWords() {
    return gSearchKeyWords
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

function setPos(x, y, width, lineIdx, size) {
    gMeme.lines[lineIdx].posLeft = x - width / 2
    gMeme.lines[lineIdx].posRight = x + width / 2
    gMeme.lines[lineIdx].posBottom = y + size * 1.2 / 2
    gMeme.lines[lineIdx].posTop = y - size * 1.2 / 2
}

function isLineClicked(clickedPos) {
    const lineIdx = gMeme.lines.findIndex(line => {
        if(clickedPos.x > line.posLeft && clickedPos.x < line.posRight &&
            clickedPos.y > line.posTop && clickedPos.y < line.posBottom) return true
    })
    gLineDragIdx = lineIdx
    return lineIdx
}

function setLineDrag(boolean) {
    gMeme.lines[gLineDragIdx].isDrag = boolean
}

function moveLine(dx, dy) {
    gMeme.lines[gLineDragIdx].x += dx
    gMeme.lines[gLineDragIdx].y += dy
}


function changePage(num) {
    gPageIdx += num
    if (gPageIdx * PAGE_SIZE + PAGE_SIZE > gEmojies.length) {
        disableButton('next')
    } else if (!gPageIdx) disableButton('prev')
    else disableButton('none')
}

function getKeyWords() {
    return gSearchKeyWords
}

function changeWordSize(word) {
    const words = loadFromStorage('KeyWords')
    const keyIdx = words.findIndex(key => key.word === word)
    words[keyIdx].count++
    saveToStorage('KeyWords', words)
}

function removeLine() {
    console.log('line', gMeme.selectedLineIdx)
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
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
            gMeme.lines[lineIdx].x = gElCanvas.width / 2
            gMeme.lines[lineIdx].y = 50
            break
        case 1:
            gMeme.lines[lineIdx].x = gElCanvas.width / 2
            gMeme.lines[lineIdx].y = gElCanvas.height - 50
            break
        default:
            gMeme.lines[lineIdx].x = gElCanvas.width / 2
            gMeme.lines[lineIdx].y = gElCanvas.height / 2
            break
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
    gMeme.font = meme.font
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

function disableButton(btn) {
    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')
    if (btn === 'next') {
        nextBtn.disabled = true
        prevBtn.disabled = false
    } else if (btn === 'prev') {
        prevBtn.disabled = true
        nextBtn.disabled = false
    }
    else {
        nextBtn.disabled = false
        prevBtn.disabled = false
    }
}

function createEmojies() {
    return ['&#128512', '&#128513', '&#128514', '&#128515',
        '&#128516', '&#128517', '&#128518', '	&#128519', '&#128520', '&#128521',
        '&#128522', '&#128523', '	&#128524', '&#128525', '&#128526', '&#128527', '&#128528']
}

function getEmojies() {
    const startIdx = gPageIdx * PAGE_SIZE
    return gEmojies.slice(startIdx, startIdx + 3)
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