import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  createPostDtoUnit = this.fb.group({
    idCustomer: ['', [Validators.required]],
    namePost: ['', [Validators.required]],
    idDemand: ['', [Validators.required]],
    idLandType: ['', [Validators.required]],
    idWards: ['', [Validators.required]],
    idDirection: ['', [Validators.required]],
    numberAddress: ['', [Validators.required]],
    price: ['', [Validators.required]],
    area: ['', [Validators.required]],
    note: ['', []],
    imageListURL: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
  }

  savePost() {
    
  }
}
