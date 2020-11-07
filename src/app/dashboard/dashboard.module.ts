import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { SavingsComponent } from './savings/savings.component';
import { DashHomeComponent } from './dash-home/dash-home.component';


@NgModule({
  declarations: [DashLayoutComponent, SavingsComponent, DashHomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
