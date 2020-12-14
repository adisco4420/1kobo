import { GeneralService } from './../../shared/services/general.service';
import { DashService } from './../services/dash.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { calculateUtils, dateUtils, planTypesUtil, durationLists } from 'src/app/utilities/util';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  minDate = new Date().toJSON().split('T')[0];
  planType;
  planTypes = [
    {name: 'bronze', interest: 5, minimumAmount: 5000, minDur: 4, bgColor: '#cd7232'},
    {name: 'silver', interest: 7.5, minimumAmount: 15000, minDur: 6, bgColor: '#C0C0C0'},
    {name: 'gold', interest: 10, minimumAmount: 30000, minDur: 12, bgColor: '#cda632'},
  ];
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    frequency: new FormControl('monthly', [Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(5000)]),
    duration: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required])
  });
  showNewPlanCard = 'first';
    trans = [
    {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
    {type: 'savings', desc: 'New saving plan', amount: 500, date: '10 June 2020'},
    {type: 'investment', desc: 'New investment plan', amount: 1000, date: '10 Dec 2020'},
    {type: 'bank', desc: 'Withdraw fund to bank account', amount: 1000, date: '10 Dec 2020'},
    {type: 'card', desc: 'Funded Wallet via card', amount: 200, date: '12 April 2020'},
  ];
  totalSavings;
  durationList: number[];
  savingsList: any[];
  activeSavingsList: any[];
  loading = false;
  constructor(
    private dashSrv: DashService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private gs: GeneralService,
    ) {
    this.form.controls.frequency.valueChanges.subscribe(value => {
      this.setMinAmountValidation();
      this.getDurationList();
      this.getCtrl('amount').reset();
    });
  }
  bankInfo;
  ngOnInit(): void {
    this.activateTab();
    this.getSavings();
  }
  getSavings() {
    this.getTotalSavingsAmount();
    this.dashSrv.getUserSavings().subscribe(({data}) => {
      this.savingsList = data;
      this.activeSavingsList = data.filter(dat => (dat.status === 'active' || dat.status === 'pending'));
    });
  }
  getTotalSavingsAmount() {
    this.dashSrv.getTotalSavingsAmount().subscribe(res => this.totalSavings = res);
  }

  activateTab() {
    this.route.queryParams.subscribe(res => {
      const viewType = res && res.view ? res.view : 'home';
      const selectedTab = document.getElementById(`${viewType}-tab`);
      if (selectedTab) {
        selectedTab.click();
      }
    });
  }
  navigateTab(tab) {
    this.router.navigate(['/dashboard/savings'], {queryParams: {view: tab}});
  }
  getFormValue = (f) => this.form.value[f];
  getCtrl = (f) => this.form.controls[f];
  changeView = (view: string) => this.showNewPlanCard = view;
  handleAddNewPlan(planType) {
    this.planType = planType;
    this.setValidation();
    this.changeView('second');
  }
  handleCancelPlan() {
    this.form.reset();
    this.form.controls.frequency.patchValue('monthly');
    this.changeView('first');
  }
  setValidation() {
    const frequency = this.getFormValue('frequency');
    const minDur = planTypesUtil[this.planType.name].minDuration[frequency];
    this.form.controls.duration.setValidators([Validators.required, Validators.min(minDur)]);
    this.form.controls.duration.updateValueAndValidity();
    this.setMinAmountValidation();
    this.getDurationList();
  }
  setMinAmountValidation() {
    const minAmount = planTypesUtil[this.planType.name].minAmount;
    this.form.controls.amount.setValidators([Validators.required, Validators.min(minAmount)]);
    this.form.controls.amount.updateValueAndValidity();
  }
  getDurationList() {
    const frequency = this.getFormValue('frequency');
    this.getCtrl('duration').setValue('');
    this.durationList = durationLists[this.planType.name][frequency];
  }
  get maturityDate() {
    let date;
    const { frequency, duration, startDate} = this.form.value;
    if (frequency && duration && startDate) {
      date = dateUtils.getMaturityDate({frequency, duration, startDate});
    }
    return date;
  }
  get interestRate() {
    let interest;
    const {frequency,  amount, duration} = this.form.value;
    if (this.planType && frequency && amount && duration) {
      interest = calculateUtils.savingsInterest({planType: this.planType.name, ...this.form.value});
    }
    return interest;
  }
  get totalInterest() {
    let total: number;
    const {frequency,  amount, duration} = this.form.value;
    if (this.planType && frequency && amount && duration) {
      total = (amount * duration) + this.interestRate;
    }
    return total;
  }
  get durText() {
    const frequency = this.getFormValue('frequency');
    const text = frequency === 'monthly' ? 'months' : frequency === 'weekly' ? 'weeks' : 'days';
    return text;
  }
  get withdrawFee(): number {
    const fee = calculateUtils.withdrawFee({planType: this.planType});
    return fee;
  }
  addPlan() {
    const payload = {
      ...this.form.value,
      planType: this.planType.name,
      startDate: dateUtils.addTime(this.getFormValue('startDate'), {days: 1})
    };
    if (this.form.valid) {
      this.loading = true;
      this.dashSrv.createSavingsPlan(payload).subscribe(res => {
        this.getSavings();
        this.bankInfo = this.gs.getSuccessData(res);
        this.changeView('fourth');
        this.toastr.success('Savings plan created successfully');
      }, err => {
        this.toastr.error(this.gs.getErrMsg(err));
      }).add(() => this.loading = false);

    }
  }
  handleDone() {
    this.form.reset();
    this.changeView('first');
  }



}
