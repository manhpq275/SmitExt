import axios from "axios";
const iframe = document.querySelector("iframe");
const popup = '<div id= "notice" class="notice">'+
'  <img class="notice-icon" src="assets/images/notice.svg"/>'+
'  <h3>Notice</h2>'+
'<div id="update-content"></div>'+
'<button id="btnUpdate" type="button">Update now</button>'+
'</div>';

iframe.src ="http://localhost:4200/?t="+Date.now(); 

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
            iframe.contentWindow.postMessage(JSON.stringify(responseData), "*");

        });
        return;
    }

        var formData = new FormData();
        if (message.params) {
            Object.keys(message.params).forEach((key) => formData.append(key, message.params[key]));
        }
        try {
            let response = await fetch(message.url, {
            method: message.method,
            body: message.params ? formData : null,
            headers: message.headers,
            });
            let html = await response.text().then((res) => res);
            var responseData = {};
                responseData.callbackId = message.callbackId
        
                try {
                    const tmp = JSON.parse(html);
                    responseData.data = tmp;
        
                } catch (ex) {
                    responseData.data = html;
                }
                iframe.contentWindow.postMessage(JSON.stringify(responseData), "*");
        } catch (error) {
            const data = {};
            data.errorData = error;
            data.callbackId = message.callbackId;
            iframe.contentWindow.postMessage(JSON.stringify(data), "*");
        }
        
    
}

    
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