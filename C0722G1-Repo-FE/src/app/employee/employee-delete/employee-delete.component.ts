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

  deleteEmployee(): void {
    console.log(this.employee.idEmployee);
    this.employeeService.deleteEmployee(this.employee.idEmployee).subscribe(() => {
      this.eventDelete.emit();
      this.showToastrSuccess();
    }, error => {
      this.showToastrError();
    }, () => {});
  }

  private showToastrSuccess(): void {
    this.notificationService.showSuccess('Xóa nhân viên thành công');
  }

  private showToastrError(): void {
    this.notificationService.showError('Có lỗi khi thực hiện');
  }

}
