if(window.attachEvent)window.attachEvent("onload",sendTracking);else if(window.onload){var curronload=window.onload,newonload=function(e){curronload(e),sendTracking(e)};window.onload=newonload}else window.onload=sendTracking;var _waq=_waq||[],endpoint="https://collector.bioregionalassessments.gov.au/msg",wa=function(e,n){sendTracking(null,n.eventAction+" "+n.hitType,n)};function sendTracking(e,n="pageview",t={}){var o,a=t.eventCategory?t.eventCategory+" "+t.eventAction+" "+t.hitType:document.title,i=t.eventLabel?t.eventLabel:window.location.href,r=navigator.userAgent;o=r.indexOf("Firefox")>-1?"Mozilla Firefox":r.indexOf("Opera")>-1||r.indexOf("OPR")>-1?"Opera":r.indexOf("Trident")>-1?"Microsoft Internet Explorer":r.indexOf("Edge")>-1?"Microsoft Edge":r.indexOf("Chrome")>-1?"Google Chrome or Chromium":r.indexOf("Safari")>-1?"Apple Safari":"unknown",getJSON("https://api.ipify.org?format=json&callback=?",function(e,t){var r=6e4*(new Date).getTimezoneOffset(),s=new Date(Date.now()-r).toISOString().slice(0,-1);_waq.push(["title",a]),_waq.push(["url",i]),_waq.push(["referrer",document.referrer]),_waq.push(["timestamp",s]),_waq.push(["ip_address",JSON.parse(t).ip]),_waq.push(["user_agent",o]),_waq.push(["event_name",n]),_waq.push(["topic","web-analytics"]),postJSON(endpoint,_waq,function(e,n){})})}Date.prototype.toUTCDate||(Date.prototype.toUTCDate=function(){return this.getUTCFullYear()+"-"+("0"+(this.getUTCMonth()+1)).slice(-2)+"-"+("0"+this.getUTCDate()).slice(-2)});var getJSON=function(e,n){var t=new XMLHttpRequest;t.open("GET",e,!0),t.responseType="text",t.onload=function(){var e=t.status;n(200===e?null:e,t.response)},t.send()},postJSON=function(e,n,t){var o=new XMLHttpRequest,a={};for(i=0;i<n.length;i++)a[n[i][0]]=n[i][1];var r=JSON.stringify(a);o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/json; charset=utf-8"),o.onload=function(){200!==o.status?console.log("failed to send analytics tracking data"):t(o.status,o.response)},o.onreadystatechange=function(){4===o.readyState&&404===o.status&&console.log("Oh no, failed to load analytics server!")},o.send(r)};