import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { SavingsComponent } from './savings/savings.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [DashLayoutComponent, SavingsComponent, DashHomeComponent, InvestmentsComponent, ProfileComponent, TransactionsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
