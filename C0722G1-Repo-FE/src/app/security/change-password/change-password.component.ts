import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountDto} from '../../dto/AccountDto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  accountDto: AccountDto[] = [];
  updateForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
    this.updateForm = new FormGroup({
      idAccount: new FormControl(),
      currentPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmPassword: new FormControl()
    });
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idCustomer');
      if (id != null) {
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
    this.accountService.updatePassword(password).subscribe(data => {
      if (data != null) {
        this.toastrService.error('Không có dữ liệu để chỉnh sửa ', 'Thông báo');
      } else {
        this.toastrService.success('Thay đổi mật khẩu thành công!', 'Thông báo');
        this.router.navigateByUrl('/home');
      }
    }, error => {
      console.log(error);
    });
  }
}
