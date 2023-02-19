'use strict'

let gTrans = {
    upload: {en: 'Upload Image' , he: 'העלה תמונה'},
    'nav-gallery': {en: 'GALLERY' , he: 'גלריה'},
    'nav-memes': {en: 'MEMES' , he: 'ממים'},
    'nav-about': {en: 'ABOUT' , he: 'עלינו'},
    'screen-gallery': {en: 'GALLERY' , he: 'גלריה'},
    'screen-memes': {en: 'MEMES' , he: 'ממים'},
    'screen-about': {en: 'ABOUT' , he: 'עלינו'},
    'search': {en: 'Search' , he: 'חיפוש'},
    'flexible': {en: `I'm flexible` , he: 'אני זורם'},
    'option-funny': {en: 'funny' , he: 'מצחיק'},
    'option-baby': {en: 'baby' , he: 'תינוק'},
    'option-cute': {en: 'cute' , he: 'חמוד'},
    'option-dog': {en: 'dog' , he: 'כלב'},
    'option-laugh': {en: 'laugh' , he: 'צוחק'},
    'option-obama': {en: 'obama' , he: 'אובמה'},
    'option-explain': {en: 'explain' , he: 'מסביר'},
    'option-victory': {en: 'victory' , he: 'ניצחון'},
    'option-kiss': {en: 'kiss' , he: 'נשיקה'},
    'option-toast': {en: 'toast' , he: 'לחיים'},
    'option-toystory': {en: 'toystory' , he: 'צעצוע של סיפור'},
    'option-cat': {en: 'cat' , he: 'חתול'},
    'show-more': {en: 'Show more' , he: 'עוד'},
    'about-title': {en: 'About us' , he: 'קצת עלינו'},
    'about-sub': {en: 'Our memes project' , he: 'פרוייקט המימים שלנו'},
    'about-desc': {en: makeLorem(70) , he: makeLoremHE(70)},
    save: {en: 'Save' , he: 'שמירה'},
    download: {en: 'Download' , he: 'הורדה'},
    share: {en: 'Share' , he: 'שיתוף'},
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let translation = transMap[gCurrLang]
    if (!translation) translation = transMap.en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        if (el.placeholder) el.placeholder = translation
        else el.innerText = translation
    })
}