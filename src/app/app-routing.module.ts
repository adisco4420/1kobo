import { FaqsComponent } from './main/faqs/faqs.component';
import { ContactUsComponent } from './main/contact-us/contact-us.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { HomeComponent } from './main/home/home.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'faqs', component: FaqsComponent},
    ],
  },
  {path: '', loadChildren: () =>  import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
