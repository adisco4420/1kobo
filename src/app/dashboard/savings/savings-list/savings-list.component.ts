import { Component, Input } from '@angular/core';
import { SavingsI } from 'src/app/interfaces/interface';
import $ from 'jquery';
import { planTypesUtil, calculateUtils, dateUtils } from 'src/app/utilities/util';

@Component({
  selector: 'app-savings-list',
  templateUrl: './savings-list.component.html',
  styleUrls: ['./savings-list.component.scss']
})
export class SavingsListComponent {
  @Input() activeSavingsList: SavingsI[];
  @Input() btnId = 'planModalBtn';
  selectedPlan: SavingsI;
  planTypesUtil = planTypesUtil;
  date = new Date();

  constructor() { }

  statusColor(status) {
    const res = status === 'pending' ? 'warning' : status === 'active' ? 'success' : 'secondary';
    return res;
  }
  viewPlan = (plan) => {
    this.selectedPlan = plan;
    $(`#${this.btnId}`).click();
  }
  getInterestRate(plan) {
    return calculateUtils.savingsInterest(plan);
  }
  getwithdrawFee(plan) {
    return calculateUtils.withdrawFee(plan);
  }
  getTotalInterest(plan) {
    return calculateUtils.savingsTotalInterest(plan);
  }
  getTotalEarned(plan: SavingsI) {
    return calculateUtils.getSavingsTotalEarned(plan)
  }

}
