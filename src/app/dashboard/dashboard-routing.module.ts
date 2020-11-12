import { ProfileComponent } from './profile/profile.component';
import { InvestmentsComponent } from './investments/investments.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { SavingsComponent } from './savings/savings.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashLayoutComponent,
    children: [
      {path: '', component: DashHomeComponent, data: {heading: 'Dashboard'}},
      {path: 'savings', component: SavingsComponent, data: {heading: 'Savings'}},
      {path: 'investments', component: InvestmentsComponent, data: {heading: 'Investments'}},
      {path: 'account', component: ProfileComponent, data: {heading: 'Account'}},
      {path: 'transactions', component: TransactionsComponent, data: {heading: 'Transactions'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
