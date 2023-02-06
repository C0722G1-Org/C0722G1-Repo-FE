import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataForm} from '../../entity/form/data-form';
import {DataFormService} from '../../service/data-form.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.css']
})
export class FormDeleteComponent implements OnInit {
  @Input()
  dataFormDelete: DataForm = {};
//Tạo output để goi phương thức reload lại trang list
  @Output() deleteEvent = new EventEmitter();


  constructor(private  dataFormService :DataFormService , private router:Router, private alertService:AlertService,) {
  }

  ngOnInit(): void {

  }
  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: deleteDataForm()
   */
  deleteDataForm() {
    this.dataFormService.deleteById(this.dataFormDelete.idDataForm).subscribe(data => {
        this.alertService.showMessage("xóa thành công!")
        this.deleteEvent.emit();
      }
      , error => {
        this.alertService.showMessageErrors("xóa không thành công!")
      }
      , () => {
      }
    );

  }

}

