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
  page = 0;
  contentDataForm = '';
  dataFormPage!: DataFormJson;
  dataFormList: DataForm[] = [];
  dataForm: DataForm = {};
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective | undefined;

  constructor(private dataFormService: DataFormService, private toastrService: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Hồ sơ và biểu mẫu');
  }

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
        this.dataFormList = data.content;
        if (contentDataForm !== '' && !flag) {
          this.toastrService.success('Tìm kiếm thành công.', 'Thông Báo');
        }
      }
    }, error => {
      this.contentDataForm = '';
      this.dataFormList = [];
      flag = true;
      if (this.dataFormPage != null) {
        this.showToastrError();
      }
    });
  }

  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: reloadList
   *
   */
  // load lại list
  reloadList(): void {
    this.page = 0;
    this.ngOnInit();
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: show message toastr when search error
   */
  private showToastrError(): void {
    this.toastrService.error('Không có kết quả cần tìm.', 'Thông báo');
  }

  gotoPage(pageNumber: number): void {
    this.page = pageNumber;
    this.ngOnInit();
  }
}
