import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../service/security.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import {Toast, ToastrService} from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

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
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle('Trang đăng nhập')
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
  login(): void {
    const signInForm = this.signInForm?.value;
    this.securityService.signIn(signInForm).subscribe(data => {
        if (data.token !== undefined) {
          if (this.signInForm?.value.rememberMe) {
            this.tokenService.rememberMe(data.roles, data.name, data.token);
            this.router.navigateByUrl('/header');
          } else {
            this.tokenService.setToken(data.token);
            this.tokenService.setName(data.name);
            this.tokenService.setRole(data.roles);
            this.statusRole = data.roles;
            this.tokenService.setEmail(data.email);
            this.tokenService.setIdAccount(data.idAccount);
            location.href = 'http://localhost:4200/home';
            // window.open('http://localhost:4200/home');
            this.toast.info('Đăng nhập thành công.', 'Thông báo',{
              timeOut: 3000
            });
          }
        }
        // @ts-ignore
        if (data.status === 202) {
          this.toast.error('Mật khẩu không đúng vui lòng nhập lại.', 'Thông báo', {
            timeOut: 3000,
            extendedTimeOut: 1500
          });
        }
      }, error => {
        if (error.status === 403) {
          this.toast.error('Đăng nhập thất bại, vui lòng nhập lại.', 'Thông báo')
        }
      }
    )
    ;
  }
}
