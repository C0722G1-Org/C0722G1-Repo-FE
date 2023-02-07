import {Component, OnInit, ViewChild} from '@angular/core';
import {DataFormService} from '../../service/data-form.service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {DataFormJson} from '../../entity/form/data-form-json';
import {DataForm} from '../../entity/form/data-form';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  constructor(private dataFormService: DataFormService, private toastrService: ToastrService, private title: Title) {
    this.title.setTitle('Hồ sơ và biểu mẫu');
  }

  page = 0;
  contentDataForm = '';
  dataFormPage!: DataFormJson;
  dataForm: DataForm = {};
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective | undefined;

  ngOnInit(): void {
    this.searchByContent(this.contentDataForm, true);
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: get list dataForm from BE
   * @param: contentDataForm,flag
   * @return dataForm[] if success
   */
  searchByContent(contentDataForm: string, flag: boolean): void {
    if (!flag) {
      this.page = 0;
    }
    this.contentDataForm = contentDataForm;
    this.dataFormService.searchByContent(this.contentDataForm.trim(), this.page).subscribe(data => {
      if (data.content.length !== null) {
        this.dataFormPage = data;
      }
    }, error => {
      this.contentDataForm = '';
      flag = true;
      if (this.dataFormPage != null) {
        this.showToastrError();
      }
      console.log(error);
    });
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: show message toastr when search error
   */
  private showToastrError(): void {
    this.toastrService.error('Không có kết quả cần tìm', 'Thông báo');
  }

  gotoPage(pageNumber: number): void {
    this.page = pageNumber;
    this.ngOnInit();
  }
}
