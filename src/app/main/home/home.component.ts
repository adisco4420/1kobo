import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  savings = [
    {
      title: 'Periodical Savings', icon: 'periodical-saving.jpg',
      desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'Target Savings', icon: 'target-saving.png',
      desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      title: 'Lock Savings', icon: 'lock-save.png',
      desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    }
  ];
  securitys = [
    {
      title: 'Bank-grade Security',
      desc: 'Our payment processors are PCIDSS compliant to ensure optimum security of your data electronically.'
    },
    {
      title: 'Best-In-Class Investments',
      desc: 'We invest in low risk fixed income securities which include treasury bills, government bonds.'
    },
    {
      title: 'Asset Under Secure Watch',
      desc: 'We invest your savings in low risk financial instruments held on behalf of our customers by Meristem Trustees'
    },
    {
      title: 'Professionally managed assets',
      desc: 'You can personalize access to the mobile app with your fingerprint or face recognition feature.'
    }
  ];
  userWizards = [
    {title: 'Create an account', desc: 'Sign up for an account with your name, email and phone number'},
    {title: 'Add a payment method', desc: 'Using your debit card, bank account, USSD, QR Code, setup your first plan.'},
    {title: 'Watch your money grow', desc: 'Sit back, relax & let your money work for you all day, everyday.'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
