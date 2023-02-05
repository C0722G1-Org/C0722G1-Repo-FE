import {Component, Inject, OnInit} from '@angular/core';


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  selectedImage: any = null;
  url: string | undefined;
  id: string | undefined;
  file: string | undefined;


  constructor() {
  }


  ngOnInit() {

  }



}
