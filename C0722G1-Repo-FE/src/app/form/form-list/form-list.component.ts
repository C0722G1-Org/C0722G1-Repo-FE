import {Component, OnInit, ViewChild} from '@angular/core';
import {DataForm} from '../../entity/form/data-form';
import {DataFormService} from '../../service/data-form.service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {DataFormJson} from '../../entity/form/data-form-json';



@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  page = 0;
  contentDataForm = '';
  totalElement = 0;
  totalPage = 0;
  dataFormPage: DataForm[] = [];
  dataForm: DataForm = {};


  constructor(private dataFormService: DataFormService, private toastrService: ToastrService) {
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
    this.dataFormService.searchByContent(this.contentDataForm, this.page).subscribe(data => {
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
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: reloadList
   *
   */
  //load lại list
  reloadList() {
  this.searchByContent("");
  }

  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: reloadList
   *
   */
  // load lại list
  reloadList(): void {
    this.searchByContent('', true);
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
