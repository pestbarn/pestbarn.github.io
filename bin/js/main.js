function hello(){alert("Hello World!")}var xhr=new XMLHttpRequest;xhr.open("GET","bin/partials/header.html",!0),xhr.onreadystatechange=function(){4===this.readyState&&200===this.status&&(document.getElementsByTagName("header").innerHTML=this.responseText)},xhr.send();