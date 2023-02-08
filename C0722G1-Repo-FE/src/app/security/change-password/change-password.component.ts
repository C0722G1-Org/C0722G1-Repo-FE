import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {AccountService} from '../../service/account.service';
import {AccountDto} from '../../dto/AccountDto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  accountDto: AccountDto[] = [];
// @ts-ignore
  account: AccountDto = {};
  updateForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private title: Title) {
    this.title.setTitle('Change Password');
    this.updateForm = new FormGroup({
      idAccount: new FormControl(this.account.idAccount),
      currentPassword: new FormControl(this.account.currentPassword, [Validators.minLength(6)]),
      newPassword: new FormControl(this.account.newPassword, [Validators.minLength(6)]),
      confirmPassword: new FormControl(this.account.confirmPassword, [Validators.minLength(6)]),
    });
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idCustomer');
      if (id != null) {
        console.log(id);
        this.getAccountById(+id);
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   * Function: get account by id
   */
  private getAccountById(idAccount: number): void {
    this.accountService.findById(idAccount).subscribe(data => {
      this.updateForm.patchValue(data);
      this.accountDto = data;
    });
  }

  /**
   * Create by: VanNTC
   * Date created: 31/01/2023
   */

  changePassword(): void {
    const password = this.updateForm.value;
    this.accountService.updatePassword(password).subscribe((data: any) => {
      if (data != null) {
        this.toastrService.error('Không có dữ liệu để chỉnh sửa ', 'Thông báo');
      } else {
        this.toastrService.success('Thay đổi mật khẩu thành công!', 'Thông báo');
        this.router.navigateByUrl('/home');
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
