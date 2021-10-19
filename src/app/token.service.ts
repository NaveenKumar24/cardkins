import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  AuthorizedToken:any;
  token:any;
  secKeys:any;
  url:any;
  EncryptedResponse:any;
  baseURL = environment.api;

 headers = new HttpHeaders({
    'Content-Type': 'text/json',
     'Authorization-Token':  this.generateToken(),
    //   // "Access-Control-Allow-Origin" : "*",
    //   // "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    //   // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  });
  constructor(private http: HttpClient) { }


  generateToken(){
    this.secKeys = [
      "wwEauO5BHSQRVYopRWVNin1cqybd",
      "25elLuv4UQlzdfYhee1CsIvQRx3I",
      "4lu5xcILyoGlntUBvguDPU8L6Yuu",
      "JNTX0nAtfpBAXMs0YQZ8xueuD02k",
      "nj8ZsXCkUsvAtlfGeuqClIxq8w7Z",
      "siU9uZG6qmS9KHfpfYOLPYQSK09e",
      "wSa6Zn2wYvQUfjZ2bq2dmHKkhvJU",
      "SBz4alJYMWjgPtQuI4qp9X1d7f2o",
      "H0YodhdW6W34ZBpFHVO30abmFeU5",
      "KV65tfQW75DrP4xwAwQ8rvWlR8yr",
      "Ywi9MiMlZ8L4uTHLSgn6mplTNWNY",
      "8Vourj7LXEfrrMXClWNXnLTvU1Et",
      "KPvzUxnDUaNLW6yNA6PaRjs1Jzuw",
      "C2azfNAITpW3iTrKJCBrXFuXmnbk",
      "g3qfC0Bb9XpJ5q4VjV181hsGyDZ6",
      "ICN1vZlZ800sRQLvW2vqKYxRvdt9",
      "Ljr9bES6JxXfEfXseJqlV6u5Rswu",
      "O6GSqmOYJ1RN7OmifPlpBFxmwHnO",
      "zvssSirNrEzcQ8jm2dnGULaBHGtJ",
      "Jdgj99jXIi4ZhY1aaJZCfKtSdg4o",
      "VrlMyiENiQdQZLeTiOj5UAk8rqn8",
      "uNFcF5Cb7sk9Un2KpInUqatP69TU",
      "GneH4FdUKALeJCWznklrIZSiDTSU",
      "e0gGlrVUNdEOJh9o6JKnD3lVXmMq",
      "U5EkxJ0UeF2brBlKfWhkanm4JoQk",
      "OKs8fo9RYebArpK1Qt6CSb0BFlQr",
      "TKbI3QGTX46DCTvA5h3vcvnZsNRw",
      "Uq33YS8ODSGai0eWw3A8qzGhsfOi",
      "gBZp8U9qADotVh7macMmRRmzNTFe",
      "kWK2DarB3bcO1xWtOQmJ1eHQSmRP",
      "YkboOeFo2wp5z5s998ud53l7r6nG",
      "O4jbIcnS9yAWsr0bkqT6vIQU1xTf",
      "9e7R19Z8MNwWSZ9L8YvNDJWAmqUG",
      "oPkUIITe1sfsS1PW47oVIEWcCGbz",
      "I6oKoSU7nbNJGeUP3C4L39GpC98j",
      "3HSCqdW4DUDAhStctePntGjAMQ6J",
      "09IpTvEfJLdmIaMi83olPn5iuUzw",
      "hS0ZhNEEMYqwONSiAmfT4ABSmU3M",
      "Dk495R71VDE5VHWkN2XBVXhHyf2h",
      "QhxNT1Aldr06QaM6ik7woaFu710q",
      "CxLZZakxQ1ldHuGfBav4KkiNhF20",
      "cDPbBUjqgahz0Zqq8dp3UjshG6fc",
      "O72UhuUMmKcwLa9l36Eu41ODZ9f3",
      "VsVEyGbjiMRFFdEyB2r3jGnJ1uiW",
      "sy4iOa14yY7E8aDqo8paxZChRmUO",
      "EMNEiE0tSt0olKAm4n4ID7f2FHjS",
      "wXQmGnzmL3f4jUY4IAymZZmorLKG",
      "qU8bfi74dOh8UYbBHAitjkuES72W",
      "vl55ct504EYBWdb4d0RB7lgqmbgG",
      "j4JhpkJ1SmgldkGDlhWGI0kcp1YK"
    ];
    // console.log("SecKeys Length is " + " " + this.secKeys.length);
    let randomValue = this.secKeys[Math.floor(Math.random() * this.secKeys.length)];
    // console.log("Random Element is " + " " + randomValue);
    // CardKins*#An0nym0u$U&3r#*uNFcF5Cb7sk9Un2KpInUqatP69TU
    this.token = 'CardKins'+'*#*'+'An0nym0u$U&3r'+'*#*'+ randomValue;
    console.log(this.token);
     var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
    //Encoding the Password in from UTF8 to byte array
    var Pass = CryptoJS.enc.Utf8.parse('Y2FyZGtpbnNzYWx0a2V5');
    //Encoding the Salt in from UTF8 to byte array
    var Salt = CryptoJS.enc.Utf8.parse("Y2FyZGtpbnNzYWx0a2V5");
    //Creating the key in PBKDF2 format to be used during the decryption
    var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
    //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
    var encrypted = CryptoJS.AES.encrypt(this.token, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
    this.AuthorizedToken = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    // this.AuthorizedToken = this.token;
    console.log("Authorization Token is" + " " + encrypted);
    return this.AuthorizedToken;   
  }

  EncryptedData(encryptedData){
    var str = encryptedData;
    var ConvertToJSON = str;
    console.log(ConvertToJSON);
      // console.log("Encrypted Data is" + " " + JSON.parse('+ 'encryptedData));
      var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
      //Encoding the Password in from UTF8 to byte array
      var  Pass = CryptoJS.enc.Utf8.parse('Y2FyZGtpbnNzYWx0a2V5');
      //Encoding the Salt in from UTF8 to byte array
      var Salt = CryptoJS.enc.Utf8.parse("Y2FyZGtpbnNzYWx0a2V5");
      //Creating the key in PBKDF2 format to be used during the decryption
      let key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
      //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
      var encrypted = CryptoJS.AES.encrypt(JSON.stringify(ConvertToJSON), key128Bits1000Iterations, 
        { 
          mode: CryptoJS.mode.CBC, 
          iv: iv, 
          padding: CryptoJS.pad.Pkcs7 
        });
      let encryptedResponse = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
      return encryptedResponse;
  }

  DecryptedData(response) {
     var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
     //Encoding the Password in from UTF8 to byte array
     var Pass = CryptoJS.enc.Utf8.parse('Y2FyZGtpbnNzYWx0a2V5');
     //Encoding the Salt in from UTF8 to byte array
     var Salt = CryptoJS.enc.Utf8.parse("Y2FyZGtpbnNzYWx0a2V5");
     //Creating the key in PBKDF2 format to be used during the decryption
     var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
     //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
     var decrypted = CryptoJS.AES.decrypt(response, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
      console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
      let DecryptOutput = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return (DecryptOutput);
  }
  
  postdata(encryptString,url) {  
    let body ={"request": (encryptString)};
     return this.http.post(this.baseURL +url, body,{ headers: this.headers}).toPromise();
  }

  metaTagsReport(encryptString) {
    let body ={"request": (encryptString)}
     return this.http.post(this.baseURL +'WebAdminPanel/MetaTagsReport', body,{ headers: this.headers}).toPromise();
  }

  userStatus(encryptString) {
    let body ={"request": (encryptString)}
    return this.http.post(this.baseURL +'WebAdminPanel/UserStatusReport', body,{ headers: this.headers}).toPromise();
  }

  countOfExchangedCards(encryptString) {
    let body ={"request": (encryptString)}
    return this.http.post(this.baseURL +'WebAdminPanel/ExchangedAndScannedCardReport', body,{ headers: this.headers}).toPromise();
  }

  countOfScannedContacts(encryptString) {
    let body ={"request": (encryptString)}
    return this.http.post(this.baseURL +'WebAdminPanel/ExchangedAndScannedCardReport', body,{ headers: this.headers}).toPromise();
  }

  UserVisingCards(encryptString) {
    let body ={"request": (encryptString)}
    return this.http.post(this.baseURL +'WebAdminPanel/UserCardDetailsReport', body,{ headers: this.headers}).toPromise();
  }

  UserVisingCardsMeta(encryptString){
    let body ={"request": (encryptString)}
    return this.http.post(this.baseURL +'WebAdminPanel/UserEVistingCardMetaTagReport', body,{ headers: this.headers}).toPromise();
  }

}

