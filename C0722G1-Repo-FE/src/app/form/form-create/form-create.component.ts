import {Component, Inject, OnInit} from '@angular/core';

import {formatDate} from '@angular/common';
import {finalize, timeout} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {DataFormService} from '../../service/data-form.service';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  selectedFile: any = null;

  constructor(
    private dataFormService: DataFormService,
    private route: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private toastrService: ToastrService) {
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function: massage validate
   */
  validationMessages = {
    contentDataForm: [
      {type: 'required', message: 'Vui lòng nhập nội dung biểu mẫu '},
      {type: 'pattern', message: 'Vui lòng nhập đúng định dạng'},
      {type: 'minLength', message: 'Vui lòng nhập ít nhất 7 kí tự'},
      {type: 'maxLength', message: 'Vui lòng nhập không quá 50 kí tự'}
    ],
    fileForm: [
      {type: 'required', message: 'Vui lòng thêm file  '}
    ]
  };
  dataFormCreate = new FormGroup({
    contentDataForm: new FormControl('', [Validators.required, Validators.pattern(
      '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
      'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'), Validators.minLength(7), Validators.maxLength(50)]),
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
    this.storage.upload(nameFile, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.dataFormCreate.patchValue({urlDataForm: url});

          // Call API to create dataForm
          this.dataFormService.createDataFormDTO(this.dataFormCreate.value).subscribe(() => {
            console.log(this.dataFormCreate);
            this.route.navigateByUrl('/form');
            this.toastrService.success('Thêm mới thành công!', 'Thông báo', {});
          });
        });
      })
    ).subscribe();
  }

  /**
   * Create by: KhanhLB
   * Date created: 03/02/2023
   * Function:get the current date and time
   */
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
