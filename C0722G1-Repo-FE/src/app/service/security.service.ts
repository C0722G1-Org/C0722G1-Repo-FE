import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {HttpClient} from "@angular/common/http";
import {SignInForm} from "../entity/account/SignInForm";
import {Observable} from "rxjs";
import {JwtResponse} from "../entity/account/JwtResponse";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private API_SIGNIN = environment.API_LOCAL + '/signin'

  constructor(private httpClient: HttpClient) {
  }

  signIn(signInForm: SignInForm): Observable<any> {
    return this.httpClient.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
}
