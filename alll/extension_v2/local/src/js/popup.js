// import axios from "axios";
init()
async function init() {
    var smitApp = false
    var tabs = await chrome.tabs.query({});

    tabs.forEach(function (tab) {
        if (tab.title.indexOf('Facebook Ads Check') > -1) {
            console.log(tab)
            smitApp = true
            chrome.windows.update(tab.windowId, {}, (window) => {
                console.log(window.focused)
                if(!window.focused){
                    chrome.windows.update(tab.windowId, {focused: true}, (window) => {
                        chrome.tabs.update(tab.id, {active: true})
                      })
                } 
              })
            window.close()
        }
    });

    if (!smitApp) {
        var extId = chrome.runtime.id;
        var url ="https://extension.codevn.org/popup.html?extId="+extId+"&t="+Date.now(); 
        chrome.windows.create({ 'url': url, 'type': 'popup', height: 800, width: 1200, top: 200, left: 200 }, function (window) {
        });
        window.close()
    }
}
