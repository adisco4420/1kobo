import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface SweetAlertI {
  icon: any;
  html: string;
  title?: string;
}
export interface SweetAlertOption {
  confirmButtonText?: string;
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
  getSuccessData(res) {
    const result = res && res.data && res.data.payload ? res.data.payload : res;
    return result;
  }
  sweetAlertHTML(data: SweetAlertI) {
    return Swal.fire({
      icon: data.icon,
      html: data.html,
      title: data.title
    });
  }
  sweetAlertAsync(type: 'question' | 'warning', message: string, observable: Observable<any>, option?: SweetAlertOption) {
    return Swal.fire({
      html: message,
      icon: type,
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: option ? option.confirmButtonText : 'Yes',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return observable
          .toPromise()
          .then((res) => {
            return {
              ...res,
              status: res.status ? res.status.toLowerCase() : 'success',
            };
          })
          .catch((err) => {
            throw ({ status: 'error', error: err });
          });
      },
      allowOutsideClick: false,
    });
  }
}
