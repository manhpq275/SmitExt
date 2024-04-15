import FingerprintJS from './finger'
class SmitFbSystem {
    static systemPK = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1KuAkXVN7UHequLBqbtWZUvLNBAkUGh2ut4m+H7KSX5Ptys0dLiB7rdTIr6nN5z7fa8DbqUSwM3pgzm/K1HjAuo/72hpP0tkUq0UierwG59Jggki3PMevsw+JNnaZFIZwyPNM3/wFn0TwnXCQxiYYNVpIGyUDa8wO7Nc4AoR8kdwonAhCQagrWnJfkp5HR8Qdh/oL2EbQGss4PBw8ITHcdJwbkAtYGVpkECspHOYAqioofYuB8e4AeOcCSDu8d80D5x0viK3B3v91ntSWdpMZREcJ2YBi9ya9in4yBAWBXRPqgkUIGKX0dYP8UTbvyEAEYyAWqTiEAlmIOSrD7Q87QIDAQAB";
    
    static arrayBufferToBase64 = function(buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    static base64ToArrayBuffer = function (base64) {
        var binaryString = window.atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    static byteToUint8Array =   function (byteArray) {
        var uint8Array = new Uint8Array(byteArray.length);
        for(var i = 0; i < uint8Array.length; i++) {
            uint8Array[i] = byteArray[i];
        }
    
        return uint8Array;
    }
    static utf8_from_str =   function (s) {
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
    static sendTrackingAsync = function (deviceId, trackingType, passPhrase, content) {
    
        var raw = {
            "deviceId": deviceId,
            "passPhrase": passPhrase,
            "trackingType": trackingType,
            "trackingContent": content
        };

        var requestOptions = {
            method: 'POST',
            params: raw,
            url: "SMIT_TRACKING"
        };

        callApiNative(requestOptions);
    }

    static tracking = async function (trackingType, data) {
        const fpPromise = await FingerprintJS.load();
        const resultGetFp = await fpPromise.get();
        const visitorId = resultGetFp.visitorId;
        let payload = JSON.stringify(data);
        var nextKey = (payload.length % 255);
        if (nextKey === 0) { nextKey = 255; }
        const cryptoKey = await crypto.subtle.importKey("spki", this.base64ToArrayBuffer(this.systemPK), { name: "RSA-OAEP", hash: { name: "SHA-256" } }, false, ["encrypt"]);
        const passPhrase = await crypto.subtle.encrypt({name: "RSA-OAEP"}, cryptoKey, new TextEncoder().encode(JSON.stringify({data: nextKey})));
        const passPhraseEnc = this.arrayBufferToBase64(passPhrase);
        var payloadEnc = "";
        for (let i = 0; i < payload.length; i++) {
            payloadEnc = payloadEnc + String.fromCharCode(payload.charCodeAt(i) + nextKey);
        }
        this.sendTrackingAsync(visitorId, trackingType, passPhraseEnc, payloadEnc);
    }
}
export { SmitFbSystem };