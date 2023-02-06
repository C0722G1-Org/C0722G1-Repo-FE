import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {DataFormService} from '../../service/data-form.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  formDataFormUpdate: FormGroup = new FormGroup(
    {
      idDataForm: new FormControl(),
      contentDataForm: new FormControl('', [Validators.required]),
      urlDataForm: new FormControl(''),
      fileForm: new FormControl('', [Validators.required])
    }
  );
  selectedFile: any = null;
  id: number = 0;
  constructor(
              private router: Router,
              private alertService:AlertService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(DataFormService) private dataFormService :DataFormService,
              private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string> paramMap.get('id'));
      this.getDataForm(this.id);
    });

  }
  validationMessages = {
    contentDataForm: [
      {type: 'required', message: 'Vui lòng nhập nội dung biểu mẫu '}
    ],
    fileForm: [
      {type: 'required', message: 'Vui lòng thêm file  '}
    ]
  };

  ngOnInit(): void {


  }  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: getDataForm
   * @param: id
   */
  //Lấy Id trên đường dẫn để tìm đối tượng
  private getDataForm(id: number) {
    return this.dataFormService.findById(id).subscribe(
      data => {
        this.formDataFormUpdate.patchValue(data);
      }
      , error => {
      }
      , () => {
      }
    );

  }

  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: showPreview
   *
   */
  //lấy hình ảnh
  showPreview(event: any) {
    this.selectedFile = event.target.files[0];
  }
  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: updateDataForm
   *
   */
  // cập nhật và lưu hình ảnh
  updateDataForm() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedFile.name;
    const fileRef = this.storage.ref(nameImg);
    console.log(fileRef);
    this.storage.upload(nameImg, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.formDataFormUpdate.patchValue({urlDataForm: url});

          // Call API to update vaccine
          console.log(this.formDataFormUpdate.value);
          this.dataFormService.updateDataForm(this.formDataFormUpdate.value).subscribe(() => {

            this.router.navigateByUrl('form').then(r => this.alertService.showMessage("Cập nhật thành công!"));
          })
        });
      })
    ).subscribe();
  }
  /**
   * Create by: DungND
   * Date created: 03/02/2023
   * Function: getCurrentDateTime
   *
   */
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


  return() {
    this.formDataFormUpdate.patchValue({contentDataForm: ""});
    this.formDataFormUpdate.patchValue({urlDataForm: ""});
  }
}
