import { GeneralService } from './../../shared/services/general.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  showLoader = true;
  status = {type: '', msg: ''};
  constructor(
    route: ActivatedRoute,
    private gs: GeneralService,
    private authSrv: AuthService) {
    const token = route.snapshot.paramMap.get('token');
    this.confirmEmail(token);
   }

  ngOnInit(): void {
  }
  confirmEmail(token) {
    this.authSrv.confirmEmail(token).subscribe(res => {
      const tokenx = this.gs.getSuccessData(res);
      this.authSrv.setUserLoggedIn(tokenx);
      this.status = {type: 'success', msg: 'Your account is verified'};
    }, () => {
      this.status = {type: 'error', msg: 'Confirmation failed an error occured'};
    }).add(() => {
      this.showLoader = false;
    });
  }

}
