var callbacks = {};
if (!window.callApiNative) {
    window.callApiNative = function(data, callback) {
        data.callbackId = Math.random();
        callbacks[data.callbackId] = callback;
        window.parent.postMessage(JSON.stringify(data), "*");
    }
}
if (!window.requestApiGlobal) {
    window.requestApiGlobal = function(config) {
        return new Promise((resolve)=>{
            window.callApiNative(config, (data)=>{
                resolve(data);
            }
            )
        }
        );
    }
}

if (!window.openNewTab) {
    window.openNewTab = function(config) {
        config.openNewTab = true;
        window.parent.postMessage(JSON.stringify(config), "*");
    }
}
if (!window.getCookieNative) {
    window.getCookieNative = function(source) {
        console.log(source);
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

window.addEventListener('message', function(ev) {
    // todo: add origin check
    if (!ev.data)
        return;

    var message;
    try {
        message = JSON.parse(ev.data);
    } catch (ex) {
        console.error(ex);
    }

    // ignore messages not having a callback ID
    if (!message || !message.callbackId)
        return;

    // we are the sender getting the callback
    if (callbacks[message.callbackId]) {
        callbacks[message.callbackId](message);
        delete callbacks[message.callbackId];
        return;
    }
    // we are the receiver so we respond with the callback ID
    // todo: restrict who can receive message (last param)
    // iframe.contentWindow.postMessage(JSON.stringify(message), '*');
});