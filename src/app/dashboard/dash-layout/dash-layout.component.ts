import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit {
  page = {title: 'Hello Sodiq', text: ''};
  constructor(
    router: Router,
    private authSrv: AuthService) {
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.data && event.snapshot.data.heading) {
          const heading = event.snapshot.data.heading;
          if (heading === 'Dashboard')  {
            this.page = {title: 'Hello Sodiq', text: 'get started'};
          } else {
            this.page = {title: heading, text: null};
          }
        }
      }
    });
   }

  ngOnInit(): void {
  }
  logout() {
    this.authSrv.logout();
  }
}
