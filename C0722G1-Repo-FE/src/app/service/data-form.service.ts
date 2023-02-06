import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataFormDto} from '../dto/form/data-form-dto';
import {environment} from 'src/environments/environment';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {DataForm} from '../entity/form/data-form';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  private url = 'http://localhost:8080/api/form';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private  httpClient: HttpClient
  ) {
  }


  findById(id: number): Observable<DataForm> {
    console.log(this.url + '/' + id);
    return this.httpClient.get<DataForm>(this.url + '/' + id);
  }

 updateDataForm(dataForm: DataForm): Observable<DataForm> {

    console.log(this.url + '/update/' + dataForm.idDataForm, dataForm);
    return this.httpClient.put<DataForm>(this.url + '/update/' + dataForm.idDataForm, dataForm);
  }


  deleteById(id: any) {
    return this.httpClient.delete<DataForm>(this.url + '/delete/' +id);
  }

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
