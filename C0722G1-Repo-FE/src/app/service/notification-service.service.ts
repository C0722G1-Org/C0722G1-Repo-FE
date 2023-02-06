import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../entity/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private API_URL = '  http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  update(id: number, notification: Notification): Observable<Notification> {
    return this.httpClient.patch<Notification>(this.API_URL + 'api/notification/update' + 1, notification);
  }

  finNotificationdById(id: number): Observable<Notification> {
    return this.httpClient.get<Notification>(this.API_URL + 'findById/' + 1);
  }

  create(notification: Notification): Observable<Notification>{
    return this.httpClient.post<Notification>(this.API_URL + 'api/notification/update' +1 , notification );
  }
}
