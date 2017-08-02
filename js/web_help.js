var queryParams = {};
var queryPage = 'home';
var debug = true; // toggle this to turn on / off for global control

/* apiCall(call_path, args, dataHandler) */
/* make an ajax call to this server with function path = call_path */
function apiCall(call_path, args, dataHandler) {
    $.ajax({
        url: call_path,
        accepts: "*/*",
        data: JSON.stringify(args),
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        success: function (data, error) {
            if (dataHandler) {
                dataHandler(data);
            }
        },
        error: function (data, error) {
            if (dataHandler) {
                dataHandler(data);
            }
        }
    });
};

/* Get the url arguments and arrange them into queryParams and queryPage */
(function () {
    var f = document.URL.split('?')[0];
    var p = document.URL.split('#')[1];
    if (p != undefined) {
        queryPage = p;
    }

    var hash;
    var q = document.URL.split('?')[1];
    if (q != undefined) {
        q = q.split('&');
        for (var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            //queryParams.push(hash[1]);
            queryParams[hash[0]] = decodeURIComponent(hash[1]);
        }
    }
}());

/* serializeObject - turn form into object */
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/* pretty print JSON */
var jsonPrettyPrint = {
    replacer: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    toHtml: function (obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, jsonPrettyPrint.replacer);
    }
};

/* log written to console.log if debug is true */
if (debug) var log = console.log.bind(window.console)
else var log = function () {}
