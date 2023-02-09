import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {AccountService} from '../../service/account.service';
import {AccountDto} from '../../dto/AccountDto';

export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return newPassword?.value === confirmPassword?.value ? null : {notmatched: true};
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  accountDto: AccountDto | undefined;
// @ts-ignore
  account: AccountDto = {};
  updateForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private title: Title,
              private formBuilder: FormBuilder) {
    this.title.setTitle('Đổi Mật Khẩu');
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idAccount');
      if (id != null) {
        this.getAccountById(+id);
      }
    });
  }

  ngOnInit(): void {
    this.getUpdateForm();
  }

  getUpdateForm() {
    this.updateForm = this.formBuilder.group({
      idAccount: [''],
      encryptPassword: ['', [Validators.minLength(6)]],
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['', [Validators.minLength(6)]],
    }, {
      validators: passwordMatchingValidator
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   * Function: get account by id
   */
  getAccountById(idAccount: number): void {
    this.accountService.findById(idAccount).subscribe(data => {
      this.accountDto = data;
      this.updateForm.patchValue({idAccount: this.accountDto?.idAccount});
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   */

  changePassword(): void {
    this.accountService.updatePassword(this.updateForm.value).subscribe(data => {
      this.toastrService.success('Thay đổi mật khẩu thành công.');
      this.router.navigateByUrl('/home');
    }, error => {
      this.toastrService.success('Thay đổi mật khẩu thành công.');
    });
  }

}
