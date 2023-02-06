import { Component, OnInit } from '@angular/core';
import {DataFormService} from '../../service/data-form.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  constructor(private dataFormService: DataFormService, private toastrService: ToastrService, private title: Title) {
    this.title.setTitle('Hồ sơ và biểu mẫu');
  }


  ngOnInit(): void {
  }

}
