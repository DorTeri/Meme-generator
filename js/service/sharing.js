'use strict'

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {

        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function downloadImg(elLink) {
    gMeme.selectedLineIdx = -1
    renderMeme()
    setTimeout(() => {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }, 100);
}

function onImgInput(ev) {
    loadImageFromInput(ev)
}

function loadImageFromInput(ev) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        gMeme.upload = event.target.result
        img.onload = () => renderMeme()
    }
    reader.readAsDataURL(ev.target.files[0]) 
}
