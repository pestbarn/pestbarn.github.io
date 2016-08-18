function keydown(event){
    if(event.which == 16) document.body.className = "shift";
}
function keyup(event){
    document.body.className = "";
}
if (window.addEventListener) {
    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
} else if (window.attachEvent)  {
    window.attachEvent('keydown', keydown);
    window.attachEvent('keyup', keyup);
}
