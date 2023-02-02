import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../service/security.service";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  statusRole: any[] = [];
  // @ts-ignore
  signInForm: FormGroup;


  constructor(
    private securityService: SecurityService,
    private tokenService: TokenService,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) {
  }

  /**
   * Created by: PhuongLTH
   * Date: 02/02/2023
   * Function: get formLogin from signInForm
   */
  getFormLogin(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    this.getFormLogin();
  }

  /**
   * Created by: PhuongLTH
   * Date: 02/02/2023
   * Function: login using Account
   */
  login() {
    const signInForm = this.signInForm?.value;
    this.securityService.signIn(signInForm).subscribe(data => {
        console.log('data -----> ', data);
        if (data.token !== undefined) {
          console.log(this.signInForm?.value.rememberMe);
          if (this.signInForm?.value.rememberMe) {
            this.tokenService.rememberMe(data.roles, data.name, data.token);
            this.router.navigateByUrl('/home');
          } else {
            this.tokenService.setToken(data.token);
            this.tokenService.setName(data.name);
            this.tokenService.setRole(data.roles);
            this.statusRole = data.roles;
            this.router.navigateByUrl('/home');
            this.toast.info('Đăng nhập thành công', 'Thông báo');
          }
        }
        // @ts-ignore
        if (data.status === 202) {
          console.log('login Failed!');
          this.toast.error('Mật khẩu không đúng vui lòng nhập lại', 'Thông báo', {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
        }
      }
    );
  }
}
