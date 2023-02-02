import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SecurityService} from "../../service/security.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogin = false;
  name: string | null | undefined;
  roles: string[] = [];

  statusRole: any[] = [];

  // @ts-ignore
  signInForm: FormGroup;

  constructor(private tokenService: TokenService,
              private router: Router,
              private toast: ToastrService,
              private formBuilder: FormBuilder,
              private securityService: SecurityService,
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.roles = this.tokenService.getRole();
    };
    this.getFormLogin();
  }

  logOut(): void {
    window.localStorage.clear();

    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
    this.toast.info('Đăng xuất thành công', ' Thông báo');
  }

  getFormLogin(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

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
            this.router.navigateByUrl('/');
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
