import { DashHomeComponent } from './dash-home/dash-home.component';
import { SavingsComponent } from './savings/savings.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard', component: DashLayoutComponent,
    children: [
      {path: '', component: DashHomeComponent},
      {path: 'savings', component: SavingsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
