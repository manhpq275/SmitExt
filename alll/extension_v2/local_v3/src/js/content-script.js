
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
    if (!message) 
    return;

    if (message.callbackId) {
        callApiHandler(message);       
    }
    if (message.openNewTab) {
        delete message.openNewTab;
        chrome.tabs.create(message);
    }
   
    
});

async function callApiHandler(message) {
    window.chrome.runtime.sendMessage(
        "knejjkhkoldncnoomibbfdifbbgocegn",
        message, // jsonable message
        (result) => {
         //   if (!window.chrome.runtime.lastError) {
            console.log(result);
          //  } else {
           // console.log(result);
           // }
        }
        );
}
