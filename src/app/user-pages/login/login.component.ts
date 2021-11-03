import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  separateDialCode = true;
  countryCode: string = '';
  password: string = '';
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  LoginForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required])
  });
  public submitted: boolean = false;
  constructor(private http: HttpClient, private TokenService: TokenService, private router: Router) {
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  onCountryChange(event) {
    console.log(event);
    // var number = document.getElementById('.phone').value;
  }

  LogIn() {
    debugger;
    this.submitted = true;
    // this.router.navigate(['dashboard']);
    console.log("Country Code is " + " " + this.countryCode);
    console.log("Country Code is " + " " + this.password);

    if (this.LoginForm.valid) {
      this.submitted = false;
      console.log('Redirect to Dashboard Page');
      this.router.navigate(['../dashboard']);
    }
    else {
      this.router.navigate(['login']);
    }
  }



  ngOnInit(): void {
    // this.getLogin();
  }

  getLogin() {
    let LoginData = {
      "PhoneNumber": "8050733916",
      "CountryCode": "+91",
      "Password": this.password,
      "RoleId": 2
    };

    // let LoginData = {
    //   "PhoneNumber": "8050733916",
    //   "CountryCode": "+91",
    //   "Password":"manja1214",
    //   "RoleId": 2
    // };

    let api = 'WebAdminPanel/Login';
    this.TokenService.postdata(this.TokenService.EncryptedData(LoginData), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.EventWiseDataReport;
      // console.log("Table Data Length is" + " " + TableData.length);
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
    })
  }

}
