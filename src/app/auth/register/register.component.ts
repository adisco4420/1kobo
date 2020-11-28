import { GeneralService } from './../../shared/services/general.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPwd = false;
  loading = false;
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, CustomValidators.email ]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    referredBy: new FormControl(''),
    infoSource: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private gs: GeneralService,
    private authSrv: AuthService) { }

  ngOnInit(): void {
  }
  getCtrl = (field) => this.form.controls[field];

  register() {
    if (this.form.valid) {
      this.loading = true;
      this.authSrv.register(this.form.value).subscribe(res => {
        this.successMg();
      }, err => {
        this.errMsg(err);
        console.log(err);
      }).add(() => this.loading = false);
    }
  }
  successMg() {
    const data = {
      icon: 'success',
      title: 'Your Account has been created',
      html: `
      <div class="mt-3">
      <p>We have sent a confirmation email to <b>${this.form.value.email || 'username@domain.com'}</b></p>
    </div>
    <div class="mt-3">
      <p>If you can not find the email in your inbox, please check your junk or spam folders or contact us directly</p>
    </div>
      `
    };
    this.gs.sweetAlertHTML(data).finally(() => this.form.reset());
  }
  errMsg(err) {
    const data = {
      icon: 'error',
      title: 'Opps',
      html: `<p>${this.gs.getErrMsg(err)}</p>`
    };
    this.gs.sweetAlertHTML(data);
  }
  togglePwd() {
    this.showPwd = !this.showPwd;
  }

}
