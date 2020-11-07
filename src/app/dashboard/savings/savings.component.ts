import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  showNewPlanCard = false;
  trans = [
    {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
    {type: 'savings', desc: 'New saving plan', amount: 500, date: '10 June 2020'},
    {type: 'investment', desc: 'New investment plan', amount: 1000, date: '10 Dec 2020'},
    {type: 'bank', desc: 'Withdraw fund to bank account', amount: 1000, date: '10 Dec 2020'},
    {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
  ];
  constructor() { }

  ngOnInit(): void {}

  handleAddNewPlan() {
    this.showNewPlanCard = true;
  }

}
