import { SavingsI } from 'src/app/interfaces/interface';
import { add , differenceInDays } from 'date-fns';
const maxDuration = {daily: 360, weekly: 48, monthly: 12};
export const planTypesUtil = {
    bronze: {
        rate: {daily: 0.166666, weekly: 1.25, monthly: 5},
        minAmount: 5000, minDuration: { daily: 120, weekly: 16, monthly: 4}, maxDuration: {...maxDuration}
    },
    silver: {
        rate: {daily: 0.25, weekly: 1.875, monthly: 7.5},
        minAmount: 15000, minDuration: {daily: 180, weekly: 24, monthly: 6}, maxDuration: {...maxDuration}
    },
    gold: {
        rate: {daily: 0.33333, weekly: 2.5, monthly: 10},
        minAmount: 30000, minDuration: {daily: 360, weekly: 48, monthly: 12}, maxDuration: {...maxDuration}
    }
};
export const durationLists = {
    bronze: {
      daily: [120, 150, 180, 210, 240, 270, 300, 330, 360],
      weekly: [16, 20, 24, 28, 32, 36, 40, 44, 48],
      monthly: [4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    silver: {
      daily: [180, 210, 240, 270, 300, 330, 360],
      weekly: [24, 28, 32, 36, 40, 44, 48],
      monthly: [6, 7, 8, 9, 10, 11, 12]
    },
    gold: {
      daily: [360],
      weekly: [48],
      monthly: [12]
    }
};
class DateUtils {
    getMaturityDate = (payload) => {
        const { frequency, duration, startDate } = payload;
        const time = frequency === 'daily' ? 'days' :  frequency === 'weekly' ? 'weeks' : 'months';
        const result = add(new Date(startDate), {[time]: duration, hours: 2});
        return new Date(result).getTime();
    }
    addTime(date, object: object) {
        const d = add(new Date(date), {...object});
        return new Date(d).getTime();
    }
    getDiffInDays(startDate, endDate) {
        const startDatex = new Date(startDate);
        const endDatex = new Date(endDate);
        return differenceInDays(endDatex, startDatex);
    }
}
class CalculateUtil {
    dateUtil = new DateUtils();
    savingsInterest = (payload: SavingsI): number => {
        const {frequency, planType,  amount, duration} = payload;
        const rate = planTypesUtil[planType].rate[frequency] / 100;
        const durationRate = rate * duration;
        const interestRate = (durationRate * amount);
        return Math.round((interestRate + Number.EPSILON) * 100) / 100;
    }
    savingsOneMonthInterest = (payload: SavingsI): number => {
        const {frequency, planType,  amount} = payload;
        const rate = planTypesUtil[planType].rate[frequency] / 100;
        const interestRate = (rate * amount);
        return Math.round((interestRate + Number.EPSILON) * 100) / 100;
    }
    savingsTotalInterest(payload: SavingsI): number {
        let total = 0;
        const {frequency,  amount, duration, planType} = payload;
        if (planType && frequency && amount && duration) {
          total = (amount * duration) + this.savingsInterest(payload);
        }
        return total;
    }
    withdrawFee = ({planType}): number => {
        const fee = planType === 'gold' ? 0.01 : 0.015;
        return fee;
    }
    getTotalMaxPayCount(payload: SavingsI) {
        const {startDate, maturityDate, frequency } = payload;
        const dateDiff = this.dateUtil.getDiffInDays(startDate, maturityDate);
        const divider = frequency === 'monthly' ? 30 : frequency === 'weekly' ? 7 : 1;
        const result = Math.floor(dateDiff / divider);
        return result;
    }
    getMaxPayCountTillDate(payload: SavingsI) {
        const {startDate, frequency, currentDate } = payload;
        const dateDiff = this.dateUtil.getDiffInDays(startDate, currentDate);
        const divider = frequency === 'monthly' ? 30 : frequency === 'weekly' ? 7 : 1;
        const result = Math.round(dateDiff / divider);
        return result;
    }
    getSavingsTotalEarned(plan: SavingsI) {
        const { startDate , paymentCount , amount, maturityDate, planType} = plan;
        const currentDate = new Date();
        // console.log({currentDate});
        const totalPaid = amount * paymentCount;
        let result = totalPaid;
        if (totalPaid > 0) {
          let planMonthDiff = dateUtils.getDiffInDays(startDate, maturityDate);
          planMonthDiff = Math.floor(planMonthDiff / 30);
          const diffdays = dateUtils.getDiffInDays(startDate, currentDate);
          const months = Math.floor(diffdays / 30);
          const oneMonthInterest = this.savingsOneMonthInterest(plan);
          const accumaltedInterest = months * oneMonthInterest;
          const withdrawFee = this.withdrawFee({planType});
          const grossAmount = accumaltedInterest > 0 ? (accumaltedInterest - withdrawFee ) : 0;
          result = grossAmount + totalPaid;
        }
        return result;
      }
}
export const dateUtils =  new DateUtils();
export const calculateUtils = new CalculateUtil();
