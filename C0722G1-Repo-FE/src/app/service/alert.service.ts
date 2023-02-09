import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }
  showMessage(message: any): void{
    this.toast.success(message, 'Thông báo:', {
      timeOut: 2000,
    });
  }

  showMessageErrors(message: any): void{
    this.toast.error(message, 'Thông báo:', {
      timeOut: 2000
    });
  }
}
