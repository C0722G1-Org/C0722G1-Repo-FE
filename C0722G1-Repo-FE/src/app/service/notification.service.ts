import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toast: ToastrService) { }
  /**
   * Created: NhanUQ
   * Function: notification success
   * @Param message
   * Date: 03/02/2023
   */
  showSuccess(message: string): void{
    this.toast.success(message);
  }
  /**
   * Created: NhanUQ
   * Function: notification error
   * @Param message
   * Date: 03/02/2023
   */
  showError(message: string): void{
    this.toast.error(message);
  }
}
