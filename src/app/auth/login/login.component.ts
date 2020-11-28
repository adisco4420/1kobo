import { GeneralService } from './../../shared/services/general.service';
import { AuthService } from './../auth.service';
import { CustomValidators } from 'ngx-custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  showPwd = false;
  redirect;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidators.email]),
    password: new FormControl('', [ Validators.required])
  });
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private gs: GeneralService,
    private authSrv: AuthService) {
      this.redirect =  route.snapshot.queryParamMap.get('returnUrl');
    }

  ngOnInit(): void {
  }
  getCtrl = (field) => this.form.controls[field];

  login() {
    if (this.form.valid) {
      this.loading = true;
      this.authSrv.login(this.form.value).subscribe((data) => {
        const token = this.gs.getSuccessData(data);
        this.authSrv.setUserLoggedIn(token);
        const link = this.redirect ? this.redirect : '/dashboard';
        this.router.navigate([link]);
      }, err => {
        if (err && err.status === 412)  {
          this.resendEmail();
        } else {
          this.gs.sweetAlertHTML({
            icon: 'error',
            title: 'Opps',
            html: `<p>${this.gs.getErrMsg(err)}</p>`
          });
        }
      }).add(() => {
        this.loading = false;
      });
    }
  }
  togglePwd() {
    this.showPwd = !this.showPwd;
  }

  resendEmail() {
    const msg = 'Your account is not verified';
    const option = {confirmButtonText: 'Resend mail'};
    const obs =  this.authSrv.resendEmail(this.form.value.email);
    this.gs.sweetAlertAsync('warning', msg, obs , option).then(res => {
      if (res && res.value) {
        this.gs.sweetAlertHTML({
          icon: 'success',
          html: `<p>${res.value.data.msg}</p>`
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

}
