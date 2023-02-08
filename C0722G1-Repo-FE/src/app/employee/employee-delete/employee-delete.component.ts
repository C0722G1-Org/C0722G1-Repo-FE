import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../entity/employee/employee';
import {EmployeeService} from '../../service/employee.service';
import {FormGroup} from '@angular/forms';

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
  constructor(private employeeService: EmployeeService) { }

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
    }, () => {

    });
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message notification delete success
   */
  private showToastrSuccess(): void {
    this.employeeService.showSuccess('Xóa nhân viên ' + this.employee.nameEmployee + ' thành công.', 'Thông báo!');
  }

  /**
   * Create by: NhanUQ
   * Date created: 03/02/2023
   * Function: show message notification delete error
   */
  private showToastrError(): void {
    this.employeeService.showError('Có lỗi khi thực hiện', 'Thông báo!');
  }

}
