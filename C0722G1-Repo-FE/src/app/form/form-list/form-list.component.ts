import {Component, OnInit} from '@angular/core';
import {DataForm} from '../../dto/data-form';
import {DataFormService} from '../../service/data-form.service';

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

  constructor(private dataFormService: DataFormService) {
  }

  ngOnInit(): void {
    this.searchByContent(this.contentDataForm);
  }

  searchByContent(contentDataForm: string): void {
    this.contentDataForm = contentDataForm;
    this.dataFormService.searchByContent(this.contentDataForm, this.page).subscribe(data => {
      this.dataFormPage = data.content;
      this.totalElement = data.totalElements;
      this.totalPage = data.totalPages;
    });
  }

  previousPage(): void {
    if (this.page === 0) {

    } else {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  nextPage(): void {
    if (this.page === this.totalPage - 1) {

    } else {
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }
}
