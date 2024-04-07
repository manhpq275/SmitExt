// let smitExtention = null;

// chrome.action.onClicked.addListener(function () {
//     chrome.windows.getAll({}, async () => {
//         if (smitExtention) {
//             chrome.windows.update(smitExtention.id, { focused: true });
//         } else {
//             const windows = await chrome.system.display.getInfo();
//             const { height, width } = windows[0].bounds;

//             var w = 1000;
//             var h = 800;
//             var left = (width / 2) - (w / 2);
//             var top = (height / 2) - (h / 2);

//             // chrome.windows.create({ 'url': '', 'type': 'popup', height: 600, width: 1200, top: 200, left: 200 }, function (window) {

//             chrome.windows.create({
//                 'url': "https://extension.smitfb.com/popup.html?t="+Date.now(),
//                 'type': 'popup',
//                 'width': w,
//                 'height': h,
//                 'left': left,
//                 'top': top
//             }, (window) => { smitExtention = window });
//         }
//     });

//     chrome.windows.onRemoved.addListener((windowId) => {
//         if (smitExtention && smitExtention.id === windowId) {
//             smitExtention = null;
//         }
//     })
// });

// chrome.windows.onFocusChanged.addListener(function (windowId) {
//     if (windowId === smitExtention?.id) {
//         chrome.runtime.sendMessage({
//             msg: "popup_focused",
//             data: {
//                 subject: "Loading",
//                 content: "Just completed!"
//             }
//         });
//     }
// });
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
    console.log(request);
    if (request.getCookies) {
        var config = {}
        if (message.domain) {
            config.domain = message.domain;
        }
        const cookies = await chrome.cookies.getAll(config);
        var responseData = {};
            responseData.callbackId = message.callbackId;
            responseData.data = cookies;
            sendResponse(responseData);
        return;
    }
    // sendResponse({data: "Hello Extension"});
    // callApiHandler(request, sendResponse);
    // if(request.greeting === "GetURL")
    // {
    //     var tabURL = "Not set yet";
    //     chrome.tabs.query({ active: true }, function(tabs) {
    //         if(tabs.length === 0) {
                // sendResponse({});
    //             return;
    //         }
    //         tabURL = tabs[0].url;
    //         sendResponse({ navURL: tabURL });
    //     });        
    // }
});
function callApiHandler(message, sendResponse) {
    console.log(message);
    if (message.getCookies) {
        var config = {}
        if (message.domain) {
            config.domain = message.domain;
        }
        chrome.cookies.getAll(config, async (cookies) => {
            var responseData = {};
            responseData.callbackId = message.callbackId;
            responseData.data = cookies;
            sendResponse(responseData);

        });
        return;
    }
    var headersRequest = new Headers();
    headersRequest.append("accept", "*/*");
    var requestOptions = {
            method: message.method.toUpperCase(),
            headers: headersRequest,
            body: message.params ? JSON.stringify(message.params) : null,
            redirect: 'follow'
            };
    fetch(message.url, requestOptions)
            .then(response => response.text())
            .then(result => {
                var responseData = {};
                responseData.callbackId = message.callbackId
        
                    try {
                        const tmp = JSON.parse(result);
                        responseData.data = tmp;
                    } catch (ex) {
                        responseData.data = result;
                    }
                    sendResponse(responseData);

            }).catch(err => {
                var responseData = {};
                responseData.callbackId = message.callbackId
                responseData.errorData = err;
                sendResponse(responseData);

            }) 
        

       

    
}


var requestApi = function(url, method, body, callback) {
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    fetch("https://api.smitfb.com/AppConfig/version", requestOptions)
    .then(response => response.text())
    .then(result => callback(resultStr))
}
