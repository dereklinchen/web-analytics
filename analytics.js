if(window.attachEvent)window.attachEvent("onload",sendTracking);else if(window.onload){var curronload=window.onload,newonload=function(e){curronload(e),sendTracking(e)};window.onload=newonload}else window.onload=sendTracking;var _waq=_waq||[],endpoint="https://analytics.bioregionalassessments.gov.au/collector/msg",wa=function(e,t){sendTracking(null,t.eventAction+" "+t.hitType,t)};function sendTracking(e,t="pageview",n={}){var a=n.eventCategory?n.eventCategory+" "+n.eventAction+" "+n.hitType:document.title,o=n.eventLabel?n.eventLabel:window.location.href;getJSON("https://api.ipify.org?format=json&callback=?",function(e,n){var s=6e4*(new Date).getTimezoneOffset(),i=new Date(Date.now()-s).toISOString().slice(0,-1);_waq.push(["title",a]),_waq.push(["url",o]),_waq.push(["referrer",document.referrer]),_waq.push(["timestamp",i]),_waq.push(["ip_address",JSON.parse(n).ip]),_waq.push(["user_agent",navigator.userAgent]),_waq.push(["event_name",t]),_waq.push(["topic","web-analytics"]),postJSON(endpoint,_waq,function(e,t){})})}Date.prototype.toUTCDate||(Date.prototype.toUTCDate=function(){return this.getUTCFullYear()+"-"+("0"+(this.getUTCMonth()+1)).slice(-2)+"-"+("0"+this.getUTCDate()).slice(-2)});var getJSON=function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="text",n.onload=function(){var e=n.status;t(200===e?null:e,n.response)},n.send()},postJSON=function(e,t,n){var a=new XMLHttpRequest,o={};for(i=0;i<t.length;i++)o[t[i][0]]=t[i][1];var s=JSON.stringify(o);a.open("POST",e,!0),a.setRequestHeader("Content-Type","application/json; charset=utf-8"),a.onload=function(){200!==a.status?console.log("failed to send analytics tracking data"):n(a.status,a.response)},a.onreadystatechange=function(){4===a.readyState&&404===a.status&&console.log("Oh no, failed to load analytics server!")},a.send(s)};
