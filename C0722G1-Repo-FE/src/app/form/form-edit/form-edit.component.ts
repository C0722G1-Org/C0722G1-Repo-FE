import {Component, Inject, OnInit} from '@angular/core';
import {UploadFileService} from '../../service/upload-file.service';
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
      contentDataForm: new FormControl(),
      urlDataForm: new FormControl()
    }
  );
  flag: boolean = false;
  selectedImage: any = null;
  id: number = 0;


  constructor(private  dataFormService: DataFormService,
              private router: Router,
              private alertService:AlertService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string> paramMap.get('id'));
      this.getDataForm(this.id);
    });

  }

  ngOnInit(): void {
  }
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


  //lấy hình ảnh
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // cập nhật và lưu hình ảnh
  updateDataForm(id: number) {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.formDataFormUpdate.patchValue({urlDataForm: url});

          // Call API to update vaccine

          this.dataFormService.updateDataForm(id,this.formDataFormUpdate.value).subscribe(() => {

            this.router.navigateByUrl('').then(r => this.alertService.showMessage("Cập nhật thành công!"));
          })
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
