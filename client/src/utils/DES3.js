import CryptoJS from 'crypto-js'
import js_base64 from 'js-base64'
const Base64 = js_base64.Base64

export default {
  keyHex: CryptoJS.enc.Utf8.parse(''),
  encrypt: function(A, str) {
    var encrypted = CryptoJS.TripleDES.encrypt(str, A ? CryptoJS.enc.Utf8.parse(A) : this.keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  },
  decrypt: function(A, str) {
    var decrypted = CryptoJS.TripleDES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(str)
    }, A ? CryptoJS.enc.Utf8.parse(A) : this.keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  },
  base64Encode: function(A, str) {
    return A ? Base64.encode(str.replace(/\//g, '*')) : Base64.encode(JSON.stringify(str).replace(/\//g, '*'))
  },
  base64Decode: function(A, str) {
    return A ? Base64.decode(str).replace(/\*/g, '/') : Base64.decode(JSON.parse(str)).replace(/\*/g, '/')
  }
}
