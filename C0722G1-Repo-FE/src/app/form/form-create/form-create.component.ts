import {Component, Inject, OnInit} from '@angular/core';

import {formatDate} from '@angular/common';
import {finalize, timeout} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {DataFormService} from '../../service/data-form.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  selectedFile: any = null;
  isOverSizeFile: boolean = false;
  isSubMit: boolean = false;

  constructor(private dataFormService: DataFormService, private route: Router, @Inject(AngularFireStorage)
              private storage: AngularFireStorage,
              private toastrService: ToastrService, private titleService: Title) {
    this.titleService.setTitle('Thêm mới biểu mẫu');
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: massage validate
   */
  validationMessages = {
    contentDataForm: [
      {type: 'required', message: 'Vui lòng nhập nội dung biểu mẫu.'},
      {type: 'pattern', message: 'Vui lòng nhập đúng định dạng, ví dụ: Hợp Đồng.'},
      {type: 'maxlength', message: 'Vui lòng nhập không quá 200 từ.'},
      {type: 'minlength', message: 'Vui lòng nhập nhiều hơn 5 từ.'}
    ],
    fileForm: [
      {type: 'required', message: '(*) Vui lòng thêm file.'}
    ]
  };
  dataFormCreate = new FormGroup({
    contentDataForm: new FormControl('', [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$'), Validators.minLength(5), Validators.maxLength(200)]),
    urlDataForm: new FormControl(''),
    fileForm: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: get file information(thông tin)
   * @param: event
   */
  showPreview(event: any): void {
    this.isOverSizeFile = event.target.files[0].size / 1024 / 1024 > 5;
    if (event.target.files[0] !== null && event.target.files[0] !== '') {
      this.selectedFile = event.target.files[0];
    }
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: save dataForm
   * @return: listDataForm
   */
  saveDataForm(): void {
    const nameFile = this.getCurrentDateTime() + this.selectedFile.name;
    const fileRef = this.storage.ref(nameFile);
    if (this.selectedFile.size / 1024 / 1024 < 5) {
      this.isSubMit = true
      this.isOverSizeFile = false;
      this.storage.upload(nameFile, this.selectedFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.dataFormCreate.patchValue({urlDataForm: url});

            // Call API to create dataForm
            this.dataFormService.createDataFormDTO(this.dataFormCreate.value).subscribe(() => {
              this.isSubMit = false;

              this.route.navigateByUrl('/form');
              this.toastrService.success('Thêm mới thành công.', 'Thông báo', {});
            });
          });
        })
      ).subscribe();
    } else {
      this.toastrService.error('Vui lòng kiểm tra lại thông tin đã điền.', 'Thông Báo')
    }
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function:get the current date and time
   */
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  resetFileValidate() {
    this.isOverSizeFile= false
  }
}
