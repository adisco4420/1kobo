import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = environment.apiUrl;
  constructor(private http: HttpClient) { }

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

}
