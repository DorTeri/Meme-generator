'use strict'

const STORAGE_KEY = 'memes'

function onSaveImage() {
    const img = getMeme()
    let images = loadFromStorage(STORAGE_KEY)
    !images ? images = [img] : images.push(img)
    saveToStorage(STORAGE_KEY, images)
}



function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}