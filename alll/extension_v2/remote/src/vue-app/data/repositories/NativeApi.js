const editorExtensionId = 'dgnipnkdlcjoicnhlpjhejbhgichblkf'
if (!window.callApiNative) {
    window.callApiNative = async function(data) {
        if (data.getCookies) {
            const response = await new Promise((resolve, reject) => {
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
    window.getCookieNative = function(source) {
        //console.log(source);
        const config = {};
        config.getCookies = true;
        config.domain = ".facebook.com";
        return new Promise((resolve)=>{
            window.callApiNative(config, (data)=>{
                resolve(data);
            }
            )
        }
        );
    }
}