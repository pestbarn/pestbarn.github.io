var xhr= new XMLHttpRequest();
xhr.open('GET', 'bin/partials/header.html', true);
xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    
document.getElementById('header').innerHTML= 
this.responseText;
};
xhr.send();
