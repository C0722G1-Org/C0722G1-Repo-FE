// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {Observable} from 'rxjs';

// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {PageNotificationDto} from '../dto/notification/page-notification-dto';
import {NotificationDeleteDto} from '../dto/notification/notification-delete-dto';
import {ToastrService} from 'ngx-toastr';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private URL_API_NOTIFICATION = 'http://localhost:8080/api/notifications';​

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Created: DatLA
   * Function: get all and search notifications
   * Date: 31/01/2023
   */
  getPageNotifications(searchNotification: any, pageNumber: any): Observable<PageNotificationDto> {
    return this.httpClient.post<PageNotificationDto>(this.URL_API_NOTIFICATION +
      '/search?page=' + pageNumber, searchNotification);
  }

  /**
   * Created: DatLA
   * Function: find notifications by selected ids
   * Date: 31/01/2023
   */
  findByListId(deleteIds: number[]): Observable<NotificationDeleteDto[]> {
    return this.httpClient.post<NotificationDeleteDto[]>(this.URL_API_NOTIFICATION + '/find-by-list-id', deleteIds);
  }

  /**
   * Created: DatLA
   * Function: delete notifications by selected ids
   * Date: 31/01/2023
   */
  delete(deleteIds: number[]): Observable<any> {
    return this.httpClient.post<any>(this.URL_API_NOTIFICATION + '/remove', deleteIds);
  }

  create(notification: Notification): Observable<Notification> {
    return this.httpClient.post<Notification>(this.URL_API_NOTIFICATION + '/create', notification);
  }

  findNotificationdById(id: number): Observable<Notification> {
    return this.httpClient.get<Notification>(this.URL_API_NOTIFICATION + '/findById/' + id);
  }

  update(id: number, notification: Notification): Observable<Notification> {
    return this.httpClient.patch<Notification>(this.URL_API_NOTIFICATION + '/update/' + id, notification);
  }
}
