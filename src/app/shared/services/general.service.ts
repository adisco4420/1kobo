import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export interface SweetAlertI {
  icon: any;
  html: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getErrMsg({error}: HttpErrorResponse) {
    const err = error && error.data && error.data.msg ? error.data.msg : 'sorry error occured, try again!';
    return err;
  }
  sweetAlertHTML(data: SweetAlertI) {
    return Swal.fire({
      icon: data.icon,
      html: data.html,
      title: data.title
    });
  }
}
