import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-users-wise-meta-tags-report',
  templateUrl: './users-wise-meta-tags-report.component.html',
  styleUrls: ['./users-wise-meta-tags-report.component.scss']
})
export class UsersWiseMetaTagsReportComponent implements OnInit {

  @Input() Token;
  @Input() postRsponse;
  token: any;
  seckey: any;
  url: any;
  iv: any;
  salt: any;
  keySize: any;
  UserWiseMetaTagsReport: any;
  AuthorizationToken: any;
  res: any;
  cipherData: any;
  dataSource: any;
  decryptedResponse: any;
  displayedColumns: string[] = ['username', 'NoOfMetaTags'];
  currentPage: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,
    private TokenService: TokenService) { }
  ngOnInit() {

    // this.currentPage = window.location.pathname;
    this.TableData();
    // const CurrentPage = this.TokenService.CurrentPage(this.currentPage);
    // this.DecryptedData(); 
    // this.Encrypt();
    // const encrypted = this.TokenService.EncryptedData(JSON.stringify(this.UserWiseMetaTagsReport));
    // const postmethod = this.TokenService.postMethod();
    // this.BindData();
  }



  TableData() {
    let UserWiseMetaTagsReport = {
      "LoginUserProfileId": 114,
      "RoleId": 2
    };

    this.TokenService.postMethod(this.TokenService.EncryptedData(UserWiseMetaTagsReport)).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserWiseMetaTagsDataReport;
    // console.log("Table Data Length is" + " " + TableData.length);
    this.dataSource = new MatTableDataSource(TableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
    })
  }

  Encrypt() {
    var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
    //Encoding the Password in from UTF8 to byte array
    var Pass = CryptoJS.enc.Utf8.parse('Y2FyZGtpbnNzYWx0a2V5');
    //Encoding the Salt in from UTF8 to byte array
    var Salt = CryptoJS.enc.Utf8.parse("Y2FyZGtpbnNzYWx0a2V5");
    //Creating the key in PBKDF2 format to be used during the decryption
    let key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
    //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
    var conversionEncryptOutput: any;
    console.log(this.UserWiseMetaTagsReport);
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.UserWiseMetaTagsReport), key128Bits1000Iterations,
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
    debugger;
    let headertest = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization-Token': this.AuthorizationToken,
      // "Access-Control-Allow-Origin" : "*",
      // "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
      // "Access-Control-Allow-Headers": "*"
    });

    let body = { "request": encryptedData }
    this.http.post('http://cardkinsapi.cardkins.com/CardkinsdevApi/api/WebAdminPanel/UserWiseMetaTagsReport', body, { headers: headertest })
      .subscribe(
        res => {
          this.res = res;
          console.log(this.res);
          let EncryptedResponse = this.res.response;
          // console.log(EncryptedResponse);
          //this.DecryptedData(EncryptedResponse);
        },
        err => {
          JSON.parse(JSON.stringify(err))
          console.log(err.message);
        }
      )
  }

  DecryptedData() {
    let response = 'DGNv0E7HTYh6S1lqeSWkNgC0US24bozOXiRyiwR7cN64Lpgwyd4pfYnhr/C0me5vtO9kUDLlBCbUdVXDZ50wIn5DGgcEx8wwk2znp4KC/tPhtl8UVMY00HxcQByHh1mYxaX3UxOwR5bunQDXxq6QSQxAmhkrIr5zUBd+TjHTd/kNKLPiP/0uJnpDLg++5AgDL5N/lOBj4/loExU3ULX+tmHG6Txh4w/nPpU2KtsPy8WQRBXiUM1CmgNTwAFPvPqykmny2AFDWhF57mRVVnffVM/rQ+KisoRXOLj+NkKx7q/1JQAi3+oAUV9ftwHituPm2s+X0YgFfPmvItWzd+uuJX7Y5Eou/bds0FxJY5mqkKfvfRR0Zh/vw7FcM6hdTLiPNAowG/+AlG2p246HeJOmGMBtoSoQXCUP8A4/76+py0osI6kJncKV2klXQVQIpUyYdkj4tlDFKxKP/1Bf6Rk3FhOues4oQJ2FZupWun9YwGOtQLJjdKCr74WL5nuCMAM5HxCkiCpDntyyhvBdCueYXA7L/sBy23CZz7chyfZBw+w6Gjn/uMNwQ6sHXQW5kObXe7CRxYO0WIZ1ZLd0D26FM3KrYDYmaSC7rS6q4VjgadGoTSSc8oSrVK06GVMO2/Lu6FoJstsBULoTwmkdPdhtoh/XhpqvmO28I/3QFT37PLupQTRUPk+1Mqexn4h/VxdctyG6e9YAoEjm8uZjqlmd8QojzoGYsJxWjXN9g+0+yYvmp/gSbfHeAyH7XSuA2wfvcUOI1ZiztjktB5YUlgRfOY799UpbXVVt+N4bW74xJaSRAVkwgN2StUUEShIgEEdlT/N8ytn0vLbQOvDPaylTdMGGzrSjTvMTZXRMbcLRVuu/RLHJxt0ccJNzSkEGFCQPjJnuAQQDl1SKHbZ4Jx3UyeNNploYLtZbYhvtu/zC5cacKdBb27aUe4BRo+oH6LX0NXBj+YtXBnqu9WGYpOKS3/59qfknZ5+dIiZqfaCRk4rsH5sLLRExG0X1XPi0jeFODmVc6PvHEKrNB7OasihAmStVEw5J7u6psax+H+IbHq7y3lkDIgEXm3SNq+tsC0pYdiEJOzBbXVxG2wYpwicKXv8e/Ikhd7XwrOUt52GZOpw4NzxTk4RIW1/W4Ebku03Atkncx6YFxhdGuQDDlqAZV9chjPCKCLl/K2oCxUkd1ykvisbzKxgCyESArEA7TPaBiYYYeP9eQZ/KyXaafseUaV39lYPMIbMSsWRoJp65YQYzMaPufdXO0bjhw0OTZuPzQF9d3eqeVVDPAkJzMlGc44WMIJW0BeNBIe1WZsUXhzOuWYP/5+yvKblYGzewsCGB5VbML9u+UwaavI4s6juox2hzdju5+ltMnarQXpPbN5lomANjDBDHCyKDAU8P774JkRRmPHEdTfmryZZGJG/DjzbfPXqs41nZ2lFuXn6/uqFutH5D8b7x77pTwZhOxzOx8b4OsSULRnyQeAkUevawdHqG24uujQrDFrJv3yKQFv/WTyNK4/WB5l+V8uhyRs5gTt+prX9Sk9vfBjNMOuqWiqM6k0h4upnQdlPjKGu0gUZAmSeNqrcExq9kp34QDsPcR1p4YA/zwJOxVcqFFm8Qc/qDz4Cf58KepAL0jDkoPn84zeFdYVqrBN5WOYOodNt1ia6nACLZhd2KbUUBI6nEnmMr8LwrwyF/HxVPRXyZbFST4sJZ40lo0SsxQeXoSu/E+RE2fcutiFh2s8JOWiUlYqPWmHCKZJrfnX7VfLugpqPkyDrxgVF9+nOPhr/hGY/UyrgHpD4mUZ0Hg1JHsbqGb70uOniEtQZ9ptPyv5viwgvsBdk1loeFjxJ8UakJtaB2vgXgUUq0AfGf/hjlmumq+pZdbh36ZADSAuZL6NsnPtWXqVPA8P4cWFHz1IRuvU1hCyMBVZJiMp0XmGwftpkEsDcMs4H0BBDcPIRTVAEylOLDqyjQ0GDPxRasEd1w0sZgamwkqZeCG/8ZUqs2IZ787WkDId1hgRU2+ff5mrKgFbYqrAp1vhN1tAiRH1VGevzm5bLTrSfzjotZsPcw5uDra14MxTAFc6Nh0iz9jaLwFtUVVApyLxjVuv0aRerPxC72XrFNE/pIwlbjMZh9gZflMxgN1VCerMQxDB2MYaM62ZA6HVDcvC0cG/7U/8gMP0FGeB45gCrpVNAWSoRIZuHc/sDkwdEePvZJau7jXC/IsvNxFzapp0sYJRkVswK7X4TPIDNMklznu3NvGafLPN/pjskpgI0GK5VdQYGWTLDGTDRd1bqt94fOaSE4I5lTfYcE/y5IGmaqf8cizWSJuT+QplMOINZntPZSpeMgFH9R3Z+UidrMTPrOw5TtM3crEYOEK2O4DaTl538gPpEHRI7IMImP34nJXCl3MV6wODghifusrYl95udAskiCbb43m7prkxEiSv6MFXM2aiU4/yA1q2x7A+V5PQhcKqRAToV9B36cyv46lRKp+xWNH9sdlKp8VqYAIE3lOv49Af+IxyPv03Jf+HLjL0o7dsB6A8kwjgFM5zTXL+mc5OO0WXY5ky+OVMsDlxyRYTOEddcLb4Hxfn8laXzcnvFw0ddVgU7QMdwL8nN+npBmyv/gfP9nHo6dThZLHM/QCKsTJOoTK/fIEhv817oIvdeCC18xPvsRJJRU2vbURRJkfgG9YHDHMfEWWQY+p12ap24pgyQiuypPswZQSd1Ln0nxZ33zlX4iEx0QhoOQBfHznn9vN2PrKk2ec3ggQXrFwgoRSzE/AfUMlrgx/6UM8sts7bApAoJlM6Hp00nAHyfyULBF+YrBrRPHwuAY5l1oxPMyqvjcxcK5iMNjwAOeNsBRLr4yOHGhVBeOXqhmmlHOkzjqJnO2GQHs';
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
    let TableData = DecryptOutput.responseValue.UserWiseMetaTagsDataReport;
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

