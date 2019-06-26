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
var endpoint = "https://analytics.bioregionalassessments.gov.au/collector/msg";

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

