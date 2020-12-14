import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }
  get isLoggedIn() {
    return this.authSrv.isUserLoggedIn;
  }

}
