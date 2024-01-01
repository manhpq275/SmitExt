import FingerprintJS from './finger'
class SmitFbSystem {
    publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1KuAkXVN7UHequLBqbtWZUvLNBAkUGh2ut4m+H7KSX5Ptys0dLiB7rdTIr6nN5z7fa8DbqUSwM3pgzm/K1HjAuo/72hpP0tkUq0UierwG59Jggki3PMevsw+JNnaZFIZwyPNM3/wFn0TwnXCQxiYYNVpIGyUDa8wO7Nc4AoR8kdwonAhCQagrWnJfkp5HR8Qdh/oL2EbQGss4PBw8ITHcdJwbkAtYGVpkECspHOYAqioofYuB8e4AeOcCSDu8d80D5x0viK3B3v91ntSWdpMZREcJ2YBi9ya9in4yBAWBXRPqgkUIGKX0dYP8UTbvyEAEYyAWqTiEAlmIOSrD7Q87QIDAQAB";
    
    
    arrayBufferToBase64 = function(buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    base64ToArrayBuffer = function (base64) {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    byteToUint8Array =   function (byteArray) {
        var uint8Array = new Uint8Array(byteArray.length);
        for(var i = 0; i < uint8Array.length; i++) {
            uint8Array[i] = byteArray[i];
        }
    
        return uint8Array;
    }
    utf8_from_str =   function (s) {
        for(var i=0, enc = encodeURIComponent(s), a = []; i < enc.length;) {
            if(enc[i] === '%') {
                a.push(parseInt(enc.substr(i+1, 2), 16))
                i += 3
            } else {
                a.push(enc.charCodeAt(i++))
            }
        }
        return a
    }
    sendTrackingAsync = function (deviceId, trackingId, content) {
        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "deviceId": deviceId,
            "trackingId": trackingId,
            "trackingContent": content
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.smitfb.com/Tracking", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    setEnAppKey = async (deviceId, passPhrase, subKey) => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "deviceId": deviceId,
            "passPhrase": passPhrase,
            "subKey": subKey
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("https://api.smitfb.com/Tracking/setEnAppKey", requestOptions);

    }
    tracking = async function (trackingType, data) {
        let payload = JSON.stringify(data);
        let payloadEnc = this.byteToUint8Array(this.utf8_from_str(payload));

        const fpPromise = await FingerprintJS.load();
        const resultGetFp = await fpPromise.get();
        const visitorId = resultGetFp.visitorId;
        console.log("VisitorId: " + visitorId);

        const key = await window.crypto.subtle.generateKey( { name: "AES-CBC", length: 256 }, true,  ["encrypt", "decrypt"] );
        const iv  = window.crypto.getRandomValues(new Uint8Array(16));
        const passPhrase = await window.crypto.subtle.exportKey("raw", key)
        const passPhraseBase64 = this.arrayBufferToBase64(passPhrase);
        
        console.log("passPhraseBase64: " + passPhraseBase64);
        console.log("ivBase64: " + this.arrayBufferToBase64(iv));

        const encrypted = await window.crypto.subtle.encrypt({ name: "AES-CBC",iv: iv}, key, payloadEnc );
        const encryptedPayloadBase64 = this.arrayBufferToBase64(encrypted);
        console.log("payloadEnc: " + encryptedPayloadBase64);

        const cryptoKey = await crypto.subtle.importKey("spki", this.base64ToArrayBuffer(this.publicKey), { name: "RSA-OAEP", hash: { name: "SHA-256" } }, false, ["encrypt"]);
        const passPhraseEnc = await crypto.subtle.encrypt({name: "RSA-OAEP"}, cryptoKey, passPhrase);
        const ivEnc = await crypto.subtle.encrypt({name: "RSA-OAEP"}, cryptoKey, iv);
        console.log("passPhraseEncBase64: " + this.arrayBufferToBase64(passPhraseEnc));
        console.log("ivEncBase64: " + this.arrayBufferToBase64(ivEnc));
        this.setEnAppKey(visitorId, this.arrayBufferToBase64(passPhraseEnc), this.arrayBufferToBase64(ivEnc)).then(result => {
           console.log(result);
           this.sendTrackingAsync(visitorId, trackingType, encryptedPayloadBase64);
       });
    }
}
export { SmitFbSystem };