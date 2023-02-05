import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataForm} from '../entity/form/data-form';
import {DataFormDto} from '../dto/form/data-form-dto';
import {environment} from 'src/environments/environment';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';


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

  // updateDataForm(id: number, dataFormDto: DataFormDto):Observable<DataFormDto> {
  //
  //   // @ts-ignore
  //   return this.httpClient.put<DataFormDto>(this.url+"/update/"+id,dataFormDto, JSON.stringify(dataFormDto), this.httpOptions);
  // }
  updateDataForm(dataForm: DataForm): Observable<DataForm> {

    console.log(this.url + '/update/' + dataForm.idDataForm, dataForm);
    return this.httpClient.put<DataForm>(this.url + '/update/' + dataForm.idDataForm, dataForm);
  }


  deleteById(id: any) {
    return this.httpClient.delete<DataForm>(this.url+"/delete/"+id);
  }

  searchByContent(contentDataForm: string, page: number): Observable<any> {
    if (contentDataForm === '') {
      return this.httpClient.get<any>('http://localhost:8080/api/form?page=' + page);
    } else {
      return this.httpClient.get<any>('http://localhost:8080/api/form?contentDataForm=' + contentDataForm + '&page=' + page);
    }
  }
}
