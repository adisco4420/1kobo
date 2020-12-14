import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { calculateUtils } from 'src/app/utilities/util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  private readonly api = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createSavingsPlan(payload){
    return this.http.post(`${this.api}/savings`, payload);
  }
  getUserSavings() {
    return this.http.get<any>(`${this.api}/savings/user`);
  }
  getTotalSavingsAmount() {
    return this.getUserSavings().pipe(map(({data}) => {
      const activeSavingsList = data.filter(dat => (dat.status === 'active' || dat.status === 'pending'));
      let totalSavings = 0;
      activeSavingsList.forEach(savingsPlan => {
        const totalEarned = calculateUtils.getSavingsTotalEarned(savingsPlan);
        totalSavings = totalEarned + totalSavings;
      });
      return totalSavings;
    }));
  }
  getProfile() {
    return this.http.get<any>(`${this.api}/users/profile`);
  }
  getUserTrans() {
    return this.http.get<any>(`${this.api}/transactions/user`);
  }

}
