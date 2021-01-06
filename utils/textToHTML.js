const textToHTML = {}
textToHTML.all = (text => text.replace(/&/gi, "&amp;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\n/gi, "<br/>"))

module.exports = textToHTML