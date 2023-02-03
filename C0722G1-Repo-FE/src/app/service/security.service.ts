import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignInForm} from '../entity/account/SignInForm';
import {Observable} from 'rxjs';
import {JwtResponse} from '../entity/account/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private API_SIGNIN = environment.API_LOCAL + '/signin';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Create by: PhuongLTH
   * Date created: 02/02/2023,
   * Function: signIn
   * @Param signInForm
   * @return HttpStatus.OK if signInForm(username) has in database or HttpStatus.BAD_REQUEST if signInForm(username) not found in database
   */
  signIn(signInForm: SignInForm): Observable<any> {
    return this.httpClient.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
}
