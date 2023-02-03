import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee/employee.service';
import {DivisionService} from '../../service/employee/division.service';
import {Router} from '@angular/router';
import {Division} from '../../entity/employee/division';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  divisions: Division[] = [];
  formCreateEmployee = new FormGroup({
    idEmployee: new FormControl(),
    codeEmployee: new FormControl('', [Validators.required, Validators.pattern('^NV-[0-9]{4}$')]),
    nameEmployee: new FormControl('', [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$')]),
    phoneEmployee: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
    emailEmployee: new FormControl('', [Validators.required, Validators.email]),
    addressEmployee: new FormControl('', Validators.required),
    genderEmployee: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    division: new FormGroup({
      idDivision: new FormControl(),
      nameDivision: new FormControl()
    }),
    flagDeleted: new FormControl(),
    // account: new FormControl('', Validators.required)
  });


  constructor(private employeeService: EmployeeService,
              private divisionService: DivisionService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  createEmployee(): void {
    const employee = this.formCreateEmployee.value;
    this.employeeService.saveEmployee(employee).subscribe(data => {
      if (data != null) {
        this.toastrService.error('Thêm mới không thành công.', 'Thông báo');
      } else {
        this.toastrService.success('Thêm mới thành công!', 'Thông báo');
        this.router.navigateByUrl('/employee');
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getAllDivision();
  }

  getAllDivision(): void {
  this.divisionService.getAllDivision().subscribe(data => {
    this.divisions = data;
  }, error => {
    console.log(error);
  });
  }

}
