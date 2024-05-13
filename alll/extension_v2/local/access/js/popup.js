init()
async function init() {
    var smitfb = false
    var tabs = await chrome.tabs.query({});

    tabs.forEach(function (tab) {
        if (tab.title.indexOf('SMITFB - Facebook Ads Check') > -1) {
            console.log(tab)
            smitfb = true
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

    if (!smitfb) {
        var extId = chrome.runtime.id;

        chrome.windows.create({ 'url': 'https://smit2.codevn.org/app?extId='+extId+'&t='+Date.now(), 'type': 'popup', height: 600, width: 1200, top: 200, left: 200 }, function (window) {
        });
        window.close()
    }
}
