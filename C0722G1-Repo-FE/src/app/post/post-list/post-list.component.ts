import {Component, OnInit} from '@angular/core';
import {LandType} from '../../entity/post/land-type';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  landTypeList: LandType[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getLandType(): void {

  }
}
