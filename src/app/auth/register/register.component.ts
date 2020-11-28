import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['/src/assets/css/auth.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPwd = false;
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-z]+\s[A-Z][a-z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    referredBy: new FormControl(''),
    infoSource: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });
  constructor() { }

  ngOnInit(): void {
  }
  getCtrl = (field) => this.form.controls[field];

  register() {
    if (this.form.valid) {
      console.log(this.form);

    }
  }
  togglePwd() {
    console.log('pask');
    
    this.showPwd = !this.showPwd;
  }

}
