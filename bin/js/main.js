"use strict";var parser=function(){var e,t,n,i,r,a=!0;return e=function(e,t){var n=new XMLHttpRequest,i=e.url,o=e.tag;"file"==t&&n.overrideMimeType("application/json"),n.open("GET",i,!0),n.onreadystatechange=function(){if(4===n.readyState&&200===n.status)switch(t){case"object":r=document.getElementsByTagName(o),r[0].innerHTML=this.responseText;break;case"file":r=document.getElementById(o),r[0].innerHTML=this.responseText}},a&&(n.ontimeout=function(){console.log("The request timed out.")},n.timeout=1e3),n.send()},{xhrObjs:function(r){for(t=r.items,n=0,i=t.length;n<i;n++){var a=t[n];e(a,"object")}},xhrFile:function(r,a){for(t=JSON.parse(r),n=0,i=t.length;n<i;n++){var o=t[n];e(o,"file")}}}}(),HeaderModule={init:function(){var e={items:[{url:"bin/partials/header.html",tag:"header"},{url:"bin/partials/navigation.html",tag:"nav"}]};parser.xhrObjs(e)}},SkillsModule={init:function(){var e="experience.json",t="skills";parser.xhrFile(e,t)}};document.addEventListener("DOMContentLoaded",function(){HeaderModule.init(),SkillsModule.init()});