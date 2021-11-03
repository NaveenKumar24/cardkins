import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PreFillService } from '../pre-fill.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles : [`
      :host {
        background-color: blue;
      }
  `]
})

export class LoginComponent implements OnInit {
  separateDialCode = true;
  countryCode: string = '';
  password: string = '';
  phone: any;
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  LoginForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required])
  });
  public submitted: boolean = false;
  constructor(private http: HttpClient, private TokenService: TokenService, private router: Router, private toast: ToastrService,
    private prefillService: PreFillService, private renderer: Renderer2) { 
      this.renderer.setStyle(document.body,'background-color','yello');
    }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }


  ngOnInit(): void { }


  LogIn() {
    debugger;
    this.submitted = true;
    console.log(this.LoginForm.value);
    console.log("Country Code is " + " " + this.LoginForm.value.phone.dialCode);
    console.log("Phone number is " + " " + this.LoginForm.value.phone.e164Number.substring(3));
    console.log("Password is " + " " + this.LoginForm.value.password);

    let LoginData = {
      "PhoneNumber": this.LoginForm.value.phone.e164Number.substring(3),
      "CountryCode": this.LoginForm.value.phone.dialCode,
      "Password": this.LoginForm.value.password,
      "RoleId": 2
    }

    // "{
    //   ""PhoneNumber"": ""8050733916"",
    //   ""CountryCode"": ""+91"",
    //   ""Password"":""manja1214"",
    //   ""RoleId"": 2
    // }"

    console.log(LoginData);

    if (this.LoginForm.valid) {
      this.submitted = false;
      console.log(LoginData);
      let api = 'WebAdminPanel/Login';
      this.TokenService.postdata(this.TokenService.EncryptedData(LoginData), api).then(async res => {
        let deceryptedData = await this.TokenService.DecryptedData(res['response']);
        console.log(deceryptedData);
        console.log(deceryptedData.responseValue);
        console.log(deceryptedData.responseValue.UserProfileId);
        this.prefillService.setUserId(deceryptedData.responseValue.UserProfileId);
        this.prefillService.setRoleId(deceryptedData.responseValue.RoleId);
        this.prefillService.setUserCardId(deceryptedData.responseValue.UserCardId);

        this.router.navigate(['../dashboard']);
        // console.log(deceryptedData.message);
        // this.toast.success('Successfully Login', 'Success !', {
        //     timeOut: 3000,
        // });

      }).catch(err => {
        JSON.parse(JSON.stringify(err))
        console.log(err.message);
      })
    }
    else if (this.LoginForm.invalid) {
      // this.toast.error('Please Enter Valid messages', 'Error !', {
      //       timeOut: 3000,
      // });
    }
    else {
      this.router.navigate(['login']);
    }
  }
}
