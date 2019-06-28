if(window.attachEvent) {
    window.attachEvent('onload', sendTracking);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            sendTracking(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = sendTracking;
    }
}

var _waq = _waq || [];
var endpoint = "https://collector.bioregionalassessments.gov.au/msg";

var wa = function(func, params) {
    sendTracking(null, params.eventAction + " " + params.hitType, params);
}

if (!Date.prototype.toUTCDate) {
    Date.prototype.toUTCDate = function() {
        return this.getUTCFullYear() + '-' +
                ('0'+ (this.getUTCMonth()+1)).slice(-2) + '-' +
                ('0'+ this.getUTCDate()).slice(-2);
    }
}

function sendTracking(evt, event_name = 'pageview', params = {}) {
    var title = params.eventCategory ? params.eventCategory + " " + params.eventAction + " " + params.hitType : document.title;
    var url = params.eventLabel ? params.eventLabel : window.location.href;

    /*
    var sBrowser, sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
    sBrowser = "unknown";
    }
    */

    getJSON("https://api.ipify.org?format=json&callback=?", function(err, response) {
        //var date = new Date();
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        _waq.push(['title', title]);
        _waq.push(['url', url]);
        _waq.push(['referrer', document.referrer]);
        _waq.push(['timestamp', localISOTime]);
        _waq.push(['ip_address', JSON.parse(response).ip]);
        _waq.push(['user_agent', navigator.userAgent]);
        _waq.push(['event_name', event_name]);
        _waq.push(['topic', "web-analytics"]);
        postJSON(endpoint, _waq, function(err, response) {});
    });
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

var postJSON = function(url, data, callback) {
    var xhr = new XMLHttpRequest();

    var jsonObj = {};

    for(i=0; i<data.length; i++) {
        jsonObj[data[i][0]] = data[i][1];
    }

    var json = JSON.stringify(jsonObj);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.log("failed to send analytics tracking data");
        } else {
            callback(xhr.status, xhr.response);
        }
    };

    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 404) {
                console.log("Oh no, failed to load analytics server!");
            }
        }
    };
    xhr.send(json);
}

