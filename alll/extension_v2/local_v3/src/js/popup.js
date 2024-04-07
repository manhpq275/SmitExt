const popup = '<div id= "notice" class="notice">'+
'  <img class="notice-icon" src="assets/images/notice.svg"/>'+
'  <h3>Notice</h2>'+
'<div id="update-content"></div>'+
'<button id="btnUpdate" type="button">Cập nhật thôi</button>'+
'</div>';
    
function checkUpdate() {
    const currentVersion = localStorage.getItem("currentVersion");
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api.smitfb.com/AppConfig/version", requestOptions)
    .then(response => response.json())
    .then(result => {if (currentVersion !== result.version) {
        localStorage.setItem("currentVersion", result.version);
        if (result.forceUpdate === true && result.contentUpdate === "") {
            window.close();
        } else if (result.forceUpdate === true) {
            document.getElementById("container").innerHTML+= popup;
            document.getElementById("update-content").innerHTML+= result.contentUpdate;
            document.getElementById("notice-background").classList.add("blur");
            document.getElementById("notice").classList.add("notice-open");
            document.getElementById("btnUpdate").onclick = function() {
                window.close();
            }
        } 
    }})
    .catch(error => console.log('error', error));
}

checkUpdate();
init()
async function init() {
    var smitfb = false
    var tabs = await chrome.tabs.query({});

    tabs.forEach(function (tab) {
        if (tab.title.indexOf('Facebook Ads Check by SMIT') > -1) {
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
        const windows = await chrome.system.display.getInfo();
        const { height, width } = windows[0].bounds;

        var w = 1000;
        var h = 800;
        var left = (width / 2) - (w / 2);
        var top = (height / 2) - (h / 2);
        chrome.windows.create({ 'url': 'https://extension.smitfb.com/popup.html?t='+Date.now(), 'type': 'popup', height: h, width: w, top: top, left: left }, function (window) {
        });
        window.close()
    }
}
