javascript:(function() {
    function se(d) {
        return d.selection ? d.selection.createRange().text : d.getSelection()
    }
    s = se(document);
    for (i=0; i<frames.length && !s; i++) s = se(frames[i].document);
    if (!s || s==='') s = prompt('Enter%20text%20to%20read','');
    open('https://sverweij.github.io/wordywordy/index.html' + (s ? '?play=1&text=' + encodeURIComponent(s) : '')).focus();
})();
