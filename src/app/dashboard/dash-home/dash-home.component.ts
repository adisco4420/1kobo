import { Router } from '@angular/router';
import { DashService } from './../services/dash.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  referralLink = 'https://1kobo.ng/salabi1';
  trans: any[];
  balance: {wallet: number, savings: number, investments: number};
  constructor(
    private dashSrv: DashService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTrans();
    this.getBalances();
  }
  getBalances() {
    const getUserBalance = this.dashSrv.getProfile();
    const getSavingsBalance = this.dashSrv.getTotalSavingsAmount();
    forkJoin([getUserBalance, getSavingsBalance]).subscribe((
      [{data: {payload: userProfile }}, savings]) => {
        const wallet = userProfile.walletBalance;
        this.balance = {wallet, savings, investments: 0};
    });
  }
  getTrans() {
    this.dashSrv.getUserTrans().subscribe(({data}) => {
      this.trans = data.slice(0, 7);
    });
  }
  viewPage(page, query?) {
    this.router.navigate([`/dashboard/${page}`], {queryParams: {view: query}});
  }

}
