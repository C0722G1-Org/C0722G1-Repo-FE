import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataForm} from '../../dto/data-form';
import {DataFormService} from '../../service/data-form.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  listDataForm: DataForm[] = [];
  selectedFile: any = null;

  constructor(private dataFormService: DataFormService, private route: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage, private toastrService: ToastrService) {
  }
  dataFormCreate = new FormGroup({
    idDataForm: new FormControl(),
    contentDataForm: new FormControl('', [Validators.required]),
    urlDataFormL: new FormControl('', [Validators.required])
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

          this.dataFormCreate.patchValue({imgVaccine: url});

          // Call API to create vaccine
          this.dataFormService.createDataFormDTO(this.dataFormCreate.value).subscribe(() => {
            this.route.navigateByUrl('');
            this.toastrService.success('Thêm mới thành công!');
          });
        });
      })
    ).subscribe();
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
