import { ContactUsComponent } from './main/contact-us/contact-us.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { HomeComponent } from './main/home/home.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'contact-us', component: ContactUsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
