import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataForm} from '../dto/data-form';

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

  // dataFormPage() : Observable<any> {
  //   return this.httpClient.get<any>(this.URL_DATAFORM);
  // }
  searchByContent(contentDataForm: string, page: number): Observable<any> {
    if (contentDataForm === '') {
      return this.httpClient.get<any>('http://localhost:8080/api/form?page=' + page);
    } else {
      return this.httpClient.get<any>('http://localhost:8080/api/form?contentDataForm=' + contentDataForm + '&page=' + page);
    }
  }

  createDataFormDTO(dataForm: DataForm): Observable<DataForm> {
    return this.httpClient.post<DataForm>('http://localhost:8080/api/form/save', JSON.stringify(dataForm), this.httpOptions);
  }
}
