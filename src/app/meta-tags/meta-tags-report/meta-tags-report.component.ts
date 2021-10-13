import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import  { TokenService } from '../../token.service';

@Component({
  selector: 'app-meta-tags-report',
  templateUrl: './meta-tags-report.component.html',
  styleUrls: ['./meta-tags-report.component.scss']
})
export class MetaTagsReportComponent implements OnInit {
  @Input()  Token;
  @Input() postRsponse;
  token:any;
  seckey:any;
  url:any;
  iv:any;
  salt:any;
  keySize:any;
  MetaTagsReport: any;
  AuthorizationToken:any;
  res:any;
  cipherData:any;
  dataSource:any;
  decryptedResponse:any;
  displayedColumns: string[] = ['MetaTagsName', 'NoOfUsers']; 

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,
    private TokenService: TokenService) { }

  
  ngOnInit() {
    this.MetaTagsReport = {
      "LoginUserProfileId": 114,
      "RoleId": 2
     };
      this.url = '/api';
      this.generateToken();   
      this.Encrypt();
      const encrypted = this.TokenService.EncryptedData(JSON.stringify(this.MetaTagsReport));
  }

  generateToken() {
    this.TokenService.generateToken().subscribe(token => {
      this.AuthorizationToken = token;
      console.log("Authorized-Token is" + " " + this.AuthorizationToken);
    })
  }

  
  Encrypt() {
    var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
    //Encoding the Password in from UTF8 to byte array
    var  Pass = CryptoJS.enc.Utf8.parse('Y2FyZGtpbnNzYWx0a2V5');
    //Encoding the Salt in from UTF8 to byte array
    var Salt = CryptoJS.enc.Utf8.parse("Y2FyZGtpbnNzYWx0a2V5");
    //Creating the key in PBKDF2 format to be used during the decryption
    let key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
    //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
    var conversionEncryptOutput: any;
    console.log(this.MetaTagsReport);
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.MetaTagsReport), key128Bits1000Iterations, 
      { 
        mode: CryptoJS.mode.CBC, 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7 
      });
    var EncryptedData = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    console.log('final - encrypted output', EncryptedData);
    this.postData(EncryptedData);
}

postData(encryptedData) {
  let headers = new HttpHeaders({
    'Content-Type': 'text/json',
    'Authorization-Token': this.AuthorizationToken,
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  });

  let body ={"request": encryptedData}
  this.http.post(this.url + 'WebAdminPanel/MetaTagsReport',body,{ headers: headers})
  .subscribe(
  res =>{
      this.res = res;
      console.log(this.res);
      let EncryptedResponse = this.res.response;
      // console.log(EncryptedResponse);
      this.DecryptedData(EncryptedResponse);
            },
            err => {
              JSON.parse(JSON.stringify(err))
              console.log(err.message);
            }
        ) 
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
   // debugger;
   let DecryptOutput = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
   // console.log(DecryptOutput.responseValue.UserWiseMetaTagsDataReport);
   let TableData = DecryptOutput.responseValue.MetaTagsDataReport;
   // console.log("Table Data Length is" + " " + TableData.length);
   this.dataSource = new MatTableDataSource(TableData);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;   
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




