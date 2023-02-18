'use strict'

const PAGE_SIZE = 3
const gEmojies = createEmojies()

let gLineDragging = false
let gLineDragIdx
let gImgs = createImages()
let gPageIdx = 0
let gSearchKeyWords
let gShowMore = false
let gCircle = { pos: { x: 1, y: 1 }, size: 10, isDrag: false }

let gMeme = {
    selectedImgId: -1,
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
            isDrag: false,
            rotate: 0
        }
    ],
    font: 'Impact'
}

function addLine(txt = 'Write here') {
    gMeme.lines.push({
        txt: txt,
        size: 20,
        align: 'center',
        txtColor: 'white',
        strokeColor: 'black',
        x: 1,
        y: 1,
        isDrag: false,
        rotate: 0
    })
    return gMeme.lines.length - 1
}

function getGWords() {
    return gSearchKeyWords
}

function search(name) {
    return gImgs.filter(img => img.keywords.some(key => key.includes(name)))
}

function randomMeme() {
    gMeme.selectedImgId = getRandomIntInclusive(1, gImgs.length - 1)
    if (Math.random() > 0.5) {
        addLine()
        setPlace(1)
    }
    gMeme.lines.forEach(line => {
        line.txt = makeLorem(3)
        line.size = getRandomIntInclusive(15, 27)
        line.color = getRandomColor()
    })
}

function isLineClicked(clickedPos) {
    const lineIdx = gMeme.lines.findIndex(line => {
        gCtx.font = `${line.size}px ${line.font}`
        const width = gCtx.measureText(line.txt).width
        const height = parseInt(gCtx.font.match(/\d+/), 10)
        if (clickedPos.x > line.x - width / 2 && clickedPos.x < line.x + width / 2 &&
            clickedPos.y > line.y - height / 2 && clickedPos.y < line.y + height / 2) return true
    })
    gLineDragIdx = lineIdx
    return lineIdx
}

function setLineDrag(boolean) {
    gMeme.lines[gLineDragIdx].isDrag = boolean
}

function drawRect(x, y, font, txt, align) {
    gCtx.font = font
    const width = gCtx.measureText(txt).width
    x = checkAlign(x, align, width)
    const height = parseInt(gCtx.font.match(/\d+/), 10)
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x - width / 2 - 10, y - height / 2, width + 20, height)
}

function checkAlign(x, align, width) {
    switch (align) {
        case 'center':
            return x
        case 'left':
            return x + width / 2
        case 'right':
            return x - width / 2
    }
}

function drawArc(x, y, font, txt, align) {
    gCtx.font = font
    const width = gCtx.measureText(txt).width
    const height = parseInt(gCtx.font.match(/\d+/), 10)
    x = checkAlign(x, align, width)
    gCtx.beginPath()
    gCtx.arc(x + width / 2 + 10, y + height / 2, 10, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'grey'
    gCtx.stroke()
    gCtx.fillStyle = 'rgba(236,236,236,0.8)'
    gCtx.fill()
    const pos = { x: x + width / 2 + 10, y: y + height / 2 }
    gCircle.pos = pos
}

function isCircleClicked(clickedPos) {
    const pos = gCircle.pos
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}

function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}

function handleCircleMove(ev) {
    const isDrag = gCircle.isDrag
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = gStartPos.x - pos.x
    const dy = gStartPos.y - pos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderMeme()
}

function moveCircle(dx, dy) {
    if (dx < 0 && dy < 0) gMeme.lines[gMeme.selectedLineIdx].size += 0.5
    else if (dx > 0 && dy > 0) gMeme.lines[gMeme.selectedLineIdx].size -= 0.5
    else if (dx > 0 && dy < 0) gMeme.lines[gMeme.selectedLineIdx].rotate += 5
    else if (dx < 0 && dy > 0) gMeme.lines[gMeme.selectedLineIdx].rotate -= 5
}

function handleLineMove(ev) {
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

function flashMsg(msg) {
    const elMsg = document.querySelector('.flash-msg')
    if (gCurrLang === 'en') elMsg.innerHTML = msg
    else elMsg.innerHTML = `<h2>נשמר</h2><i class="fa-regular fa-floppy-disk"></i>`
    const elFlash = document.querySelector('.flash-msg')
    elFlash.classList.add('open-msg')
    setTimeout(() => {
        elFlash.classList.remove('open-msg')
    }, 1500);
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
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].txtColor = color
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
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
    gMeme.selectedLineIdx = lineIdx
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
    gMeme.upload = meme.upload
    gMeme.selectedImgId = meme.selectedImgId
    gMeme.lines = meme.lines
    gMeme.font = meme.font
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function getLineTxt() {
    const idx = gMeme.selectedLineIdx
    if (idx < 0) return
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

function getWords() {
    if (!gShowMore) {
        let words = loadFromStorage('KeyWords')
        if (!words) words = createKeyWords()
        const wordsSort = words.sort((word1, word2) => word1.count - word2.count)
        const wordsMaxCount = wordsSort.slice(wordsSort.length - 5)
        return wordsMaxCount
    } else {
        const words = loadFromStorage('KeyWords')
        return words
    }
}

function changeBtnText(btn) {
    btn.innerText = !gShowMore ? 'Show less' : 'Show more'
    if (!gShowMore) {
        if (gCurrLang === 'en') btn.innerText = 'Show less'
        else btn.innerText = 'פחות'
    } else {
        if (gCurrLang === 'en') btn.innerText = 'Show more'
        else btn.innerText = 'עוד'
    }
}

function createKeyWords() {
    const words = [
        { word: 'funny', count: 23 },
        { word: 'baby', count: 25 },
        { word: 'cute', count: 12 },
        { word: 'dog', count: 31 },
        { word: 'laugh', count: 15 },
        { word: 'obama', count: 21 },
        { word: 'explain', count: 11 },
        { word: 'victory', count: 23 },
        { word: 'kiss', count: 15 },
        { word: 'toast', count: 22 },
        { word: 'toystory', count: 18 },
        { word: 'cat', count: 19 },
        { word: 'bold', count: 20 },
        { word: 'putin', count: 16 },
    ]
    saveToStorage('KeyWords', words)
    return words
}

function createImages() {
    return [
        { id: 1, url: 'images/1.jpg', keywords: ['funny', 'tramp', 'מצחיק', 'טראמפ'] },
        { id: 2, url: 'images/2.jpg', keywords: ['cute', 'dog', 'חמוד', 'כלב'] },
        { id: 3, url: 'images/3.jpg', keywords: ['cute', 'baby', 'dog', 'חמוד', 'תינוק', 'כלב'] },
        { id: 4, url: 'images/4.jpg', keywords: ['cat', 'laptop', 'לפטופ', 'חתול'] },
        { id: 5, url: 'images/5.jpg', keywords: ['victory', 'baby', 'ניצחון', 'תינוק'] },
        { id: 6, url: 'images/6.jpg', keywords: ['funny', 'explain', 'מסביר', 'חמוד'] },
        { id: 7, url: 'images/7.jpg', keywords: ['baby', 'suprised', 'תינוק', 'מופתע'] },
        { id: 8, url: 'images/8.jpg', keywords: ['funny', 'watching', 'מצחיק', 'צופה'] },
        { id: 9, url: 'images/9.jpg', keywords: ['baby', 'laugh', 'תינוק', 'צוחק'] },
        { id: 10, url: 'images/10.jpg', keywords: ['obama', 'laugh', 'אובמה', 'צוחק'] },
        { id: 11, url: 'images/11.jpg', keywords: ['kiss', 'funny', 'נשיקה', 'מצחיק'] },
        { id: 12, url: 'images/12.jpg', keywords: ['haim', 'point', 'חיים', 'מצביע'] },
        { id: 13, url: 'images/13.jpg', keywords: ['wallstreet', 'toast', 'וולסטריט', 'לחיים'] },
        { id: 14, url: 'images/14.jpg', keywords: ['scary', 'sunglass', 'מפחיד', 'משקפי שמש'] },
        { id: 15, url: 'images/15.jpg', keywords: ['exactly', 'בדיוק'] },
        { id: 16, url: 'images/16.jpg', keywords: ['laugh', 'bold', 'צוחק', 'קירח'] },
        { id: 17, url: 'images/17.jpg', keywords: ['putin', 'piece', 'פוטין', 'שלום'] },
        { id: 18, url: 'images/18.jpg', keywords: ['toystory', 'buz', 'צעצוע של סיפור', 'באז'] },
    ]
}