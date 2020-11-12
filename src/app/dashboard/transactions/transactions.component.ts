import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  table = {
    title: 'All Transactions',
    trans : [
      {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
      {type: 'savings', desc: 'New saving plan', amount: 500, date: '10 June 2020'},
      {type: 'investment', desc: 'New investment plan', amount: 1000, date: '10 Dec 2020'},
      {type: 'bank', desc: 'Withdraw fund to bank account', amount: 1000, date: '10 Dec 2020'},
      {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
      {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
      {type: 'savings', desc: 'New saving plan', amount: 500, date: '10 June 2020'},
    ]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
