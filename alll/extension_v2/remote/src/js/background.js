let smitExtention = null;

chrome.action.onClicked.addListener(function () {
    chrome.windows.getAll({}, async () => {
        if (smitExtention) {
            chrome.windows.update(smitExtention.id, { focused: true });
        } else {
            const windows = await chrome.system.display.getInfo();
            const { height, width } = windows[0].bounds;

            var w = 1000;
            var h = 800;
            var left = (width / 2) - (w / 2);
            var top = (height / 2) - (h / 2);

            chrome.windows.create({
                'url': 'popup.html',
                'type': 'popup',
                'width': w,
                'height': h,
                'left': left,
                'top': top
            }, (window) => { smitExtention = window });
        }
    });

    chrome.windows.onRemoved.addListener((windowId) => {
        if (smitExtention && smitExtention.id === windowId) {
            smitExtention = null;
        }
    })
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
    if (windowId === smitExtention?.id) {
        chrome.runtime.sendMessage({
            msg: "popup_focused",
            data: {
                subject: "Loading",
                content: "Just completed!"
            }
        });
    }
});