import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {PageNotificationDto} from '../dto/notification/page-notification-dto';
import {NotificationDeleteDto} from '../dto/notification/notification-delete-dto';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private URL_API_NOTIFICATION = 'http://localhost:8080/api/v1/notifications';

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

}
