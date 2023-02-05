import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../entity/employee/employee';
import {FormGroup} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  @Input()
  employee: Employee = {};
  @Output()
  eventDelete = new EventEmitter();
  deleteForm: FormGroup = new FormGroup({});
  constructor(private employeeService: EmployeeService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: delete employee
   */
  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee.idEmployee).subscribe(() => {
      this.eventDelete.emit();
      this.showToastrSuccess();
    }, error => {
      this.showToastrError();
    }, () => {});
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message notification delete success
   */
  private showToastrSuccess(): void {
    this.notificationService.showSuccess('Xóa nhân viên thành công');
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message notification delete error
   */
  private showToastrError(): void {
    this.notificationService.showError('Có lỗi khi thực hiện');
  }

}
