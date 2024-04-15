function serialize(obj) {
    var str = [];
    for(var p in obj)
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  }
  
async function reqAPI(url, method, header, body, type) {
    var formData = null;
    
    if (url === "SMIT_TRACKING") {
        url = "https://api.smitfb.com/Tracking";
        formData = JSON.stringify(body);
        header = new Headers();
        header.append("accept", "*/*");
        header.append("Content-Type", "application/json");

    } else if (body) {
        formData = new FormData();
        Object.keys(body).forEach((key) => formData.append(key, body[key]));
      }
    try {
        if (method.toUpperCase() === "GET") {
            var params = serialize(body);
            var res = await fetch(url + "?" + params, {
                method: method,
                body: null,
                headers: header,
            }) .then(response => response.text());
            try {
                const data = JSON.parse(res);
                return data
            } catch (e) {}
            return res;
        } else {
            var res = await fetch(url, {
                method: method,
                body: body ? formData : null,
                headers: header,
            }) .then(response => response.text());
            try {
                const data = JSON.parse(res);
                return data
            } catch (e) {}
            return res;
        }
       
    } catch (error) {
        return error;
    }
  }
  
  async function reqAPIhandleCore(url, method) {
    try {
        let response = await fetch(url, {
            method: method,
        });
        const arrayBuffer = await response.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        const base64String = btoa(
            new Uint8Array(byteArray).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
            }, "")
        );
        return base64String;
    } catch (error) {
        return error;
    }
  }
  chrome.runtime.onMessageExternal.addListener(
    async (request, sender, sendResponse) => {
        if (request.getCookies) {
            var config = {}
            if (request.domain) {
                config.domain = request.domain;
            }
            chrome.cookies.getAll(config, async (cookies) => {
                var responseData = {};
                responseData.data = cookies;
                sendResponse(JSON.stringify(responseData));
    
            });
            return;
        } else if (request.url) {
            if (request.handleCors) {
                var res = await reqAPIhandleCore(request.url, request.method);
                var responseData = {};
                responseData.data = res;

                sendResponse(JSON.stringify(responseData));
            } else {
                var res = await reqAPI(
                    request.url,
                    request.method,
                    request.header,
                    request.body,
                );
                var responseData = {};
                responseData.data = res;
                sendResponse(JSON.stringify(responseData));
            }
      } else {
        sendResponse('{ "success": "true" }');
      }
  
      if (request.message) {
        sendResponse('{ "success": "true" }');
        return;
      }
    }
  );