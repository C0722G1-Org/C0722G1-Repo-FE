import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataForm} from '../../dto/data-form';
import {DataFormService} from '../../service/data-form.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize, timeout} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  listDataForm: DataForm[] = [];
  selectedFile: any = null;
  public Editor = ClassicEditor;
  constructor(private dataFormService: DataFormService, private route: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage, private toastrService: ToastrService) {
  }

  validationMessages = {
    contentDataForm: [
      {type: 'required', message: 'Vui lòng nhập nội dung biểu mẫu '}
    ]
  };
  dataFormCreate = new FormGroup({
    contentDataForm: new FormControl('', [Validators.required]),
    urlDataForm: new FormControl('')
  });

  ngOnInit(): void {
  }

  showPreview(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveDataForm(): void {
    const nameFile = this.getCurrentDateTime() + this.selectedFile.name;
    const fileRef = this.storage.ref(nameFile);
    this.storage.upload(nameFile, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.dataFormCreate.patchValue({urlDataForm: url});

          // Call API to create vaccine
          this.dataFormService.createDataFormDTO(this.dataFormCreate.value).subscribe(() => {
            console.log(this.dataFormCreate);
            this.route.navigateByUrl('');
            this.toastrService.success('Thêm mới thành công!', 'Thông báo', {
              timeOut: 2000
            });
          });
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
