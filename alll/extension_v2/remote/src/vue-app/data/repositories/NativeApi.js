if (!window.getExtensionId) {
    window.getExtensionId = function() {
        var url = window.location.href;
        var name = "extId";
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}
var editorExtensionId = "";
if (!window.callApiNative) {
    window.callApiNative = async function(data) {
        if (data.getCookies) {
            const response = await new Promise((resolve, reject) => {
                if (editorExtensionId === "") {
                    editorExtensionId = getExtensionId();
                }
                console.log(editorExtensionId);
                chrome.runtime.sendMessage(
                    editorExtensionId,
                    data,
                    resolve
                )
            });
           
            return response;
        } else {
            var method = data.method;
            var url = data.url;
            var body = data.params;
            const response = await new Promise((resolve, reject) => {
                if (editorExtensionId === "") {
                    editorExtensionId = getExtensionId();
                }
                console.log(editorExtensionId);
                chrome.runtime.sendMessage(
                  editorExtensionId,
                  {
                    method,
                    url,
                    body
                  },
                  resolve
                )
            });
            var responseObject = JSON.parse(response);
            if (responseObject.data) {
                var n;
                try {
                    n = JSON.parse(responseObject.data)
                } catch (e) {
                    //console.log(e);
                }
                if (n)
                    return n;
            }
            return responseObject;
        }
    }
}


if (!window.openNewTab) {
    window.openNewTab = function(config) {
        window.open(config.url);
    }
}
if (!window.getCookieNative) {
    window.getCookieNative = async function(source) {
        //console.log(source);
        const config = {};
        config.getCookies = true;
        config.domain = ".facebook.com";
        const data = await callApiNative(config);
        return JSON.parse(data);
    }
}