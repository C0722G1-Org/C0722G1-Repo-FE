import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataForm} from '../dto/form/data-form';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  //
  // listDataForm(): Observable<any> {
  //   return this.httpClient.get<any>('http://localhost:8080/api/form');
  // }
  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: get list dataForm from BE
   * @param contentDataForm,page
   * @return pageDataForm
   */
  searchByContent(contentDataForm: string, page: number): Observable<any> {
    if (contentDataForm === '') {
      return this.httpClient.get<any>('http://localhost:8080/api/form?page=' + page);
    } else {
      return this.httpClient.get<any>('http://localhost:8080/api/form?contentDataForm=' + contentDataForm + '&page=' + page);
    }
  }

  /**
   * Create bt: KhanhLB
   * Date created: 03/02/2023
   * Function: save dataForm in database
   * @param: dataForm
   */
  createDataFormDTO(dataForm: DataForm): Observable<DataForm> {
    return this.httpClient.post<DataForm>('http://localhost:8080/api/form/save', JSON.stringify(dataForm), this.httpOptions);
  }
}
