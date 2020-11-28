import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = environment.apiUrl;
  private readonly localStorageKey = '1kobo_User';
  public currentUserSubject: BehaviorSubject<string>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(this.getToken);
  }

  register(form) {
    const { fullName, ...rest} = form;
    const payload = {
      firstName: fullName.split(' ') [0] || 'firstname',
      lastName: fullName.split(' ')[1] || 'lastname',
      ...rest
    };
    const body = {};
    Object.keys(payload).forEach(f => {
      if (payload[f]) {
        body[f] = payload[f];
      }
    });
    return this.http.post(`${this.api}/users/register`, body);
  }
  confirmEmail(token) {
    const headers = {Authorization: `Bearer ${token}`};
    return this.http.get(`${this.api}/users/confirm-email`, {headers});
  }
  login(payload) {
    return this.http.post(`${this.api}/users/login`, payload);
  }
  resendEmail(email) {
    return this.http.get(`${this.api}/users/resend-confirm-email/${email}`);
  }
  setUserLoggedIn(token) {
    this.currentUserSubject.next(token);
    this.storeToken(token);
  }
  get isUserLoggedIn() {
    if (this.currentUserSubject.value) {
      return true;
    } else {
      return false;
    }
  }
  get userToken() {
    return this.currentUserSubject.value;
  }
  logout() {
    this.removeToken();
  }



  private get getToken() {
    return localStorage.getItem(this.localStorageKey);
  }
  private removeToken() {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.localStorageKey);
  }
  private storeToken(token) {
    localStorage.setItem(this.localStorageKey, token);
  }
}
