import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PageNotificationDto} from '../dto/notification/page-notification-dto';
import {NotificationDeleteDto} from '../dto/notification/notification-delete-dto';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private URL_API_NOTIFICATION = 'http://localhost:8080/api/v1/notifications';
  constructor(private httpClient: HttpClient, private toast: ToastrService) {
  }
  /**
   * Created: DatLA
   * Function: get all and search notifications
   * @Param searchNotification,pageNumber
   * Date: 31/01/2023
   */
  getPageNotifications(searchNotification: any, pageNumber: any): Observable<PageNotificationDto> {
    return this.httpClient.post<PageNotificationDto>(this.URL_API_NOTIFICATION +
      '/search?page=' + pageNumber, searchNotification);
  }
  /**
   * Created: DatLA
   * Function: find notifications by selected ids
   * @Param deleteIds
   * Date: 31/01/2023
   */
  findByListId(deleteIds: number[]): Observable<NotificationDeleteDto[]> {
    return this.httpClient.post<NotificationDeleteDto[]>(this.URL_API_NOTIFICATION + '/find-by-list-id', deleteIds);
  }
  /**
   * Created: DatLA
   * Function: delete notifications by selected ids
   * @Param deleteIds
   * Date: 31/01/2023
   */
  delete(deleteIds: number[]): Observable<any> {
    return this.httpClient.post<any>(this.URL_API_NOTIFICATION + '/remove', deleteIds);
  }

  /**
   * Created: NhanUQ
   * Function: notification success
   * @Param message
   * Date: 03/02/2023
   */
  showSuccess(message: string): void {
    this.toast.success(message);
  }

  /**
   * Created: NhanUQ
   * Function: notification error
   * @Param message
   * Date: 03/02/2023
   */
  showError(message: string): void {
    this.toast.error(message);
  }
}
