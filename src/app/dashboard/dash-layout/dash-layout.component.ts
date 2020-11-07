import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit {
  page = {title: 'Hello Sodiq', text: ''};
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.includes('savings')) {
          this.page = {title: 'Savings', text: 'get started'};
        } else {
          this.page = {title: 'Hello Sodiq', text: 'get started'};
        }
      }
    });
   }

  ngOnInit(): void {
  }

}
